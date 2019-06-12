import * as React from 'react';
import { IReactDiffViewerStyles } from './styles';
interface ICommon {
    leftLineNumber?: number | boolean;
    rightLineNumber?: number | boolean;
    added?: boolean;
    removed?: boolean;
    onLineNumberClick: (lineId: string, event: React.MouseEvent<HTMLTableDataCellElement>) => void;
    renderContent?: (source: string) => JSX.Element;
    hightlightLines?: string[];
    styles: IReactDiffViewerStyles;
    hideLineNumbers?: boolean;
}
interface IInlineLine extends ICommon {
    content?: string | JSX.Element | JSX.Element[];
}
interface IDefaultLine extends ICommon {
    leftContent?: string | JSX.Element | JSX.Element[];
    rightContent?: string | JSX.Element | JSX.Element[];
    reverse: boolean;
}
export declare const InlineLine: ({ leftLineNumber, rightLineNumber, added, removed, content, onLineNumberClick, renderContent, hightlightLines, styles, hideLineNumbers, }: IInlineLine) => JSX.Element;
export declare const DefaultLine: ({ leftLineNumber, rightLineNumber, onLineNumberClick, rightContent, leftContent, added, removed, renderContent, hightlightLines, styles, hideLineNumbers, reverse, }: IDefaultLine) => JSX.Element;
export {};
