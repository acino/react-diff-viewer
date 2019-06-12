import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IReactDiffViewerStylesOverride } from './styles';
export interface IReactDiffViewerProps {
    oldValue: string;
    newValue: string;
    splitView?: boolean;
    disableWordDiff?: boolean;
    hideLineNumbers?: boolean;
    renderContent?: (source: string) => JSX.Element;
    onLineNumberClick?: (lineId: string, event: React.MouseEvent<HTMLTableCellElement>) => void;
    highlightLines?: string[];
    styles?: IReactDiffViewerStylesOverride;
    reverse?: boolean;
}
export interface IReactDiffViewerState {
}
declare class DiffViewer extends React.Component<IReactDiffViewerProps, IReactDiffViewerState> {
    static defaultProps: IReactDiffViewerProps;
    static propTypes: {
        oldValue: PropTypes.Validator<string>;
        newValue: PropTypes.Validator<string>;
        splitView: PropTypes.Requireable<boolean>;
        disableWordDiff: PropTypes.Requireable<boolean>;
        renderContent: PropTypes.Requireable<(...args: any[]) => any>;
        onLineNumberClick: PropTypes.Requireable<(...args: any[]) => any>;
        styles: PropTypes.Requireable<object>;
        hideLineNumbers: PropTypes.Requireable<boolean>;
        highlightLines: PropTypes.Requireable<string[]>;
    };
    private splitView;
    private inlineView;
    private computeStyles;
    render: () => JSX.Element;
}
export default DiffViewer;
export { IReactDiffViewerStylesOverride };
