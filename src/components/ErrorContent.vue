<script setup lang="ts">
    // function-button click
    const onButtonClick = (): void => {
        window.location.reload();
    };
</script>

<template>
    <Teleport to="body">
        <div class="fixed flex ai:center bg:#ffffff bottom:0 jc:space-between left:0 p:8 w:full z:9900">
            <div>
                <span></span>
                <span></span>
            </div>

            <a class="abs cursor:pointer p:4|8 top:50% translate(0,-50%) user-select:none"
               @click="onButtonClick"></a>
        </div>
    </Teleport>
</template>
