import { css } from 'glamor';
import { $dangerColor, $colorTextLight, $successColor } from 'styles/variables';

const $switchHeight = 28;
const $switchWidth = $switchHeight * 1.8;
const $buttonWidth = 20;
const $delta = ($switchHeight - $buttonWidth) / 2;

export const $switch = css`
    display: inline-flex;
    vertical-align: middle;
    height: 34px;
    align-items: flex-end;
`;

export const $txtLabel = css`
    vertical-align: top;
    font-size: 0.875rem;
    line-height: 1.5;
    display: inline-block;
    padding: 0.275rem;
`;

export const $label = css`
    display: inline-block;
    position: relative;
    cursor: pointer;
    outline: none;
    userSelect: none;
    width: ${$switchWidth}px;
    margin: 0;
    height: ${$switchHeight}px;
    backgroundColor: transparent;
    borderRadius: 50%;

    ::before {
        display: block;
        position: absolute;
        content: "";
        right: 0;
        left: 0;
        bottom: 0;
        top: 0;
        backgroundColor: ${$dangerColor};
        borderRadius: ${$switchHeight}px;
        border: 1px solid #fff;
        transition: background 0.4s
    }

    ::after {
        display: block;
        position: absolute;
        content: "";
        width: ${$buttonWidth}px;
        height: ${$buttonWidth}px;
        top: ${$delta}px;
        left: ${$delta}px;
        backgroundColor: ${$colorTextLight};
        borderRadius: ${$buttonWidth}px;
        transition: transform 0.4s;
    }
`;

export const $input = css`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;

    :checked + .${$label}::before {
        backgroundColor: ${$successColor}
    }

    :checked + .${$label}::after: {
        transform: translateX(${$switchWidth - $buttonWidth - (2 * $delta)}px)
    }
`;
