"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var rightLineNumberPrefix = 'R';
var leftLineNumberPrefix = 'L';
var onLineNumberClickProxy = function (onLineNumberClick, id) {
    return function (e) { return onLineNumberClick(id, e); };
};
var LineNumber = function (_a) {
    var prefix = _a.prefix, lineNumber = _a.lineNumber;
    return React.createElement("pre", { id: prefix + "-" + lineNumber }, lineNumber);
};
exports.InlineLine = function (_a) {
    var _b, _c, _d, _e;
    var leftLineNumber = _a.leftLineNumber, rightLineNumber = _a.rightLineNumber, added = _a.added, removed = _a.removed, content = _a.content, _f = _a.onLineNumberClick, onLineNumberClick = _f === void 0 ? function () { } : _f, renderContent = _a.renderContent, _g = _a.hightlightLines, hightlightLines = _g === void 0 ? [] : _g, styles = _a.styles, hideLineNumbers = _a.hideLineNumbers;
    var hightlightLine = (leftLineNumber !== true || rightLineNumber !== true)
        && (hightlightLines.includes(leftLineNumberPrefix + "-" + leftLineNumber)
            || hightlightLines.includes(rightLineNumberPrefix + "-" + rightLineNumber));
    return React.createElement("tr", { className: styles.line },
        !hideLineNumbers
            && React.createElement(React.Fragment, null,
                React.createElement("td", { className: classnames_1.default(styles.gutter, styles.leftGutter, (_b = {},
                        _b[styles.diffAdded] = added,
                        _b[styles.diffRemoved] = removed,
                        _b[styles.hightlightedGutter] = hightlightLine,
                        _b)), onClick: onLineNumberClickProxy(onLineNumberClick, leftLineNumberPrefix + "-" + leftLineNumber) }, leftLineNumber !== true
                    && React.createElement(LineNumber, { lineNumber: leftLineNumber, prefix: leftLineNumberPrefix })),
                React.createElement("td", { className: classnames_1.default(styles.gutter, styles.rightGutter, (_c = {},
                        _c[styles.diffAdded] = added,
                        _c[styles.diffRemoved] = removed,
                        _c[styles.hightlightedGutter] = hightlightLine,
                        _c)), onClick: onLineNumberClickProxy(onLineNumberClick, rightLineNumberPrefix + "-" + rightLineNumber) }, rightLineNumber !== true
                    && React.createElement(LineNumber, { lineNumber: rightLineNumber, prefix: rightLineNumberPrefix }))),
        React.createElement("td", { className: classnames_1.default(styles.marker, (_d = {},
                _d[styles.diffAdded] = added,
                _d[styles.diffRemoved] = removed,
                _d[styles.hightlightedLine] = hightlightLine,
                _d)) },
            added && React.createElement("pre", null, "+"),
            removed && React.createElement("pre", null, "-")),
        React.createElement("td", { className: classnames_1.default((_e = {},
                _e[styles.diffAdded] = added,
                _e[styles.diffRemoved] = removed,
                _e[styles.hightlightedLine] = hightlightLine,
                _e)) }, renderContent && typeof content === 'string'
            ? renderContent(content)
            : React.createElement("pre", null, content)));
};
exports.DefaultLine = function (_a) {
    var _b, _c, _d, _e, _f, _g;
    var leftLineNumber = _a.leftLineNumber, rightLineNumber = _a.rightLineNumber, onLineNumberClick = _a.onLineNumberClick, rightContent = _a.rightContent, leftContent = _a.leftContent, added = _a.added, removed = _a.removed, renderContent = _a.renderContent, _h = _a.hightlightLines, hightlightLines = _h === void 0 ? [] : _h, styles = _a.styles, hideLineNumbers = _a.hideLineNumbers, reverse = _a.reverse;
    var hightlightLeftLine = leftLineNumber !== true
        && hightlightLines.includes(leftLineNumberPrefix + "-" + leftLineNumber);
    var hightlightRightLine = rightLineNumber !== true
        && hightlightLines.includes(rightLineNumberPrefix + "-" + rightLineNumber);
    var olderColumns = (React.createElement(React.Fragment, null,
        !hideLineNumbers
            && React.createElement("td", { className: classnames_1.default(styles.gutter, styles.leftGutter, (_b = {},
                    _b[styles.diffRemoved] = removed,
                    _b[styles.hightlightedGutter] = hightlightLeftLine,
                    _b)), onClick: onLineNumberClickProxy(onLineNumberClick, leftLineNumberPrefix + "-" + leftLineNumber) }, leftLineNumber
                && React.createElement(LineNumber, { lineNumber: leftLineNumber, prefix: leftLineNumberPrefix })),
        React.createElement("td", { className: classnames_1.default(styles.marker, (_c = {},
                _c[styles.diffRemoved] = removed,
                _c[styles.hightlightedLine] = hightlightLeftLine,
                _c)) }, removed
            && React.createElement("pre", null, "-")),
        React.createElement("td", { className: classnames_1.default((_d = {},
                _d[styles.diffRemoved] = removed,
                _d[styles.hightlightedLine] = hightlightLeftLine,
                _d)) }, typeof leftContent === 'string'
            && (renderContent
                ? renderContent(leftContent)
                : React.createElement("pre", null, leftContent))
            || leftContent)));
    var newerColumns = (React.createElement(React.Fragment, null,
        !hideLineNumbers
            && React.createElement("td", { className: classnames_1.default(styles.gutter, styles.rightGutter, (_e = {},
                    _e[styles.diffAdded] = added,
                    _e[styles.hightlightedGutter] = hightlightRightLine,
                    _e)), onClick: onLineNumberClickProxy(onLineNumberClick, rightLineNumberPrefix + "-" + rightLineNumber) },
                React.createElement(LineNumber, { lineNumber: rightLineNumber, prefix: rightLineNumberPrefix })),
        React.createElement("td", { className: classnames_1.default(styles.marker, (_f = {},
                _f[styles.diffAdded] = added,
                _f[styles.hightlightedLine] = hightlightRightLine,
                _f)) }, added
            && React.createElement("pre", null, "+")),
        React.createElement("td", { className: classnames_1.default((_g = {},
                _g[styles.diffAdded] = added,
                _g[styles.hightlightedLine] = hightlightRightLine,
                _g)) }, typeof rightContent === 'string'
            && (renderContent
                ? renderContent(rightContent)
                : React.createElement("pre", null, rightContent))
            || rightContent)));
    var leftColumns = olderColumns;
    var rightColumns = newerColumns;
    if (reverse) {
        leftColumns = newerColumns;
        rightColumns = olderColumns;
    }
    return React.createElement("tr", { className: styles.line },
        leftColumns,
        rightColumns);
};
