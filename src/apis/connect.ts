// 載入axios
import Axios, { type AxiosError } from 'axios';
import { useMainStore } from '@/stores/mainStore';
// import { useDialogStore } from '@/stores/dialogStore';

// 請求失敗的統一處理
const errorHandle = (state: number, message: string) => {
    switch (state) {
        case 400:
            // 400：登入失敗，可能是帳號或密碼錯誤
            console.error('HTTP 400');

            break;
        case 401:
            // 401：backend session過期 => 移到checklogin去判斷
            console.error('HTTP 401');

            break;
        case 403:
            // 403：權限不足
            console.error('HTTP 403');

            break;
        case 404:
            // 404：請求失敗
            console.error('HTTP 404');

            break;
        default:
            // 其他錯誤，直接拋出錯誤訊息
            console.error(`RESP未攔截到的錯誤：${ message }`);
    }
};

// 定義instance
const instance = Axios.create();

instance.interceptors.request.use(
    (config) => {
        // 如果有token的話 將值放入header中
        const userToken = localStorage.getItem('accessToken');
        if (userToken) {
            config.headers['X-Access-Token'] = String(userToken);
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (response) => {
        // 共用錯誤處理地方
        // if (response.data.error) {
        //     const mainStore = useMainStore();
        //     const dialogStore = useDialogStore();
        //     const userToken = localStorage.getItem('accessToken');
        //     // token失效會踢出;
        //     if (userToken && mainStore.noAuthorizationCode.includes(response.data.error?.code)) {
        //         dialogStore.dialogType = 'noAuthorization';
        //         dialogStore.dialogTitle = '';
        //         dialogStore.dialogMessage = errorMsg;
        //         dialogStore.dialogDisplay = true;
        //     }
        // }
        return response;
    },
    (error: AxiosError) => {
        const { response } = error;

        if (response) {
            console.error('api response error! message:');
            console.log(JSON.stringify(response));
            // 成功發出請求並收到RESP，但有ERROR
            // 使用類型斷言來處理 response.data 的 error 屬性
            const errorMsg = (response.data as { error?: string }).error ?? error.message;

            errorHandle(response.status, errorMsg);

            return Promise.reject(error);
        } else {
            // 成功發出請求，但沒收到RESP
            if (!window.navigator.onLine) {
                // 判斷是網路斷線
                return Promise.reject(error);
            } else {
                // 判斷是跨域或程式問題
                return Promise.reject(error);
            }
        }
    },
);

export const request = async <R, T = unknown>(method: string, path: string, data: T, contentType?: string): Promise<R> => {
    const mainStore = useMainStore();
    const lcmethod = method.toLowerCase();
    const fullPath = `${ mainStore.apiUrl }/${ path }`;
    const config = contentType ? { headers: { 'Content-Type': contentType } } : {};

    if (lcmethod === 'get') {
        const res = await instance.get<R>(fullPath, config);

        return res.data;
    } else if (lcmethod === 'post') {
        const res = await instance.post<R>(fullPath, data, config);

        return res.data;
    } else if (lcmethod === 'put') {
        const res = await instance.put<R>(fullPath, data, config);

        return res.data;
    } else if (lcmethod === 'patch') {
        const res = await instance.patch<R>(fullPath, data, config);

        return res.data;
    } else if (lcmethod === 'delete') {
        const res = await instance.delete<R>(fullPath, config);

        return res.data;
    } else {
        console.error(`未知的method： ${ method }`);

        return Promise.reject(new Error(`未知的method： ${ method }`));
    }
};
