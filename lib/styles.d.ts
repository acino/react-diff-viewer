import { Interpolation } from 'create-emotion';
export interface IReactDiffViewerStyles {
    diffContainer?: string;
    diffRemoved?: string;
    diffAdded?: string;
    line?: string;
    hightlightedGutter?: string;
    gutter?: string;
    hightlightedLine?: string;
    marker?: string;
    wordDiff?: string;
    wordAdded?: string;
    wordRemoved?: string;
    leftGutter?: string;
    rightGutter?: string;
}
export interface IReactDiffViewerStylesOverride {
    variables?: {
        addedBackground?: string;
        addedColor?: string;
        removedBackground?: string;
        removedColor?: string;
        wordAddedBackground?: string;
        wordRemovedBackground?: string;
        addedGutterBackground?: string;
        removedGutterBackground?: string;
        gutterBackground?: string;
        gutterBackgroundDark?: string;
        highlightBackground?: string;
        highlightGutterBackground?: string;
    };
    diffContainer?: Interpolation;
    diffRemoved?: Interpolation;
    diffAdded?: Interpolation;
    marker?: Interpolation;
    hightlightedLine?: Interpolation;
    hightlightedGutter?: Interpolation;
    gutter?: Interpolation;
    line?: Interpolation;
    wordDiff?: Interpolation;
    wordAdded?: Interpolation;
    wordRemoved?: Interpolation;
    leftGutter?: Interpolation;
    rightGutter?: Interpolation;
}
declare const _default: (styleOverride: IReactDiffViewerStylesOverride) => {};
export default _default;
