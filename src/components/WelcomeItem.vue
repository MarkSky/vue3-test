<template>
    <div class="item">
        <i>
            <slot name="icon"></slot>
        </i>
        <div class="details">
            <h3>
                <slot name="heading"></slot>
            </h3>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .item {
        display: flex;
        margin-top: 2rem;
        position: relative;
    }

    .details {
        flex: 1;
        margin-left: 1rem;
    }

    i {
        color: var(--color-text);
        display: flex;
        height: 32px;
        width: 32px;
        place-items: center;
        place-content: center;
    }

    h3 {
        color: var(--color-heading);
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 0.4rem;
    }

    @media (width >= 1024px) {
        .item {
            margin-top: 0;
            padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
        }

        i {
            background: var(--color-background);
            border: 1px solid var(--color-border);
            border-radius: 8px;
            height: 50px;
            width: 50px;
            position: absolute;
            left: -26px;
            top: calc(50% - 25px);
        }

        .item::before {
            border-left: 1px solid var(--color-border);
            content: ' ';
            height: calc(50% - 25px);
            position: absolute;
            left: 0;
            bottom: calc(50% + 25px);
        }

        .item::after {
            border-left: 1px solid var(--color-border);
            content: ' ';
            height: calc(50% - 25px);
            position: absolute;
            left: 0;
            top: calc(50% + 25px);
        }

        .item:first-of-type::before {
            display: none;
        }

        .item:last-of-type::after {
            display: none;
        }
    }
</style>
