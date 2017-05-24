import { css } from 'glamor';

import { $screenWidthMin } from 'styles/variables';

export const myStyles = css`
    font-size: 2.5rem;
    @media (min-width: ${$screenWidthMin}) {
        font-size: 1.75rem;
    }

`;

export const myStyles2 = css`
    font-size: 2.5rem;
    @media (min-width: 768px) {
        font-size: 1.75rem;
    }
`;
