import * as React from 'react'
import * as diff from 'diff'
import * as PropTypes from 'prop-types'
import cn from 'classnames'

const m = require('memoize-one')
const memoize = m.default || m

import computeStyles, {
  IReactDiffViewerStyles,
  IReactDiffViewerStylesOverride,
} from './styles'
import { InlineLine, DefaultLine } from './line'

export interface IReactDiffViewerProps {
  oldValue: string;
  newValue: string;
  splitView?: boolean;
  disableWordDiff?: boolean;
  hideLineNumbers?: boolean;
  renderContent?: (source: string) => JSX.Element;
  onLineNumberClick?: (lineId: string, event: React.MouseEvent<HTMLTableCellElement>) => void;
  highlightLines?: string[];
  styles?: IReactDiffViewerStylesOverride,
  reverse?: boolean,
}

export interface IReactDiffViewerState {

}

const wordDiff = (
  oldValue: string,
  newValue: string,
  hideType: string,
  styles: IReactDiffViewerStyles,
  renderContent?: (source: string) => JSX.Element,
) => {
  const charDiff = diff.diffWordsWithSpace(oldValue, newValue)
  return charDiff.map((obj: any, i) => {
    if (obj[hideType]) return undefined
    if (renderContent) {
      return <span
        className={cn(
          styles.wordDiff,
          {
            [styles.wordAdded]: obj.added,
            [styles.wordRemoved]: obj.removed,
          },
        )}
        key={i}>
        { renderContent(obj.value) }
      </span>
    }
    return <pre
      className={cn(
        styles.wordDiff,
        {
          [styles.wordAdded]: obj.added,
          [styles.wordRemoved]: obj.removed,
        },
      )}
      key={i}>
      { obj.value }
    </pre>
  })
}

class DiffViewer extends React.Component<IReactDiffViewerProps, IReactDiffViewerState> {

  static defaultProps: IReactDiffViewerProps = {
    oldValue: '',
    newValue: '',
    splitView: true,
    highlightLines: [],
    disableWordDiff: false,
    styles: {},
    hideLineNumbers: false,
    reverse: false,
  }

  static propTypes = {
    oldValue: PropTypes.string.isRequired,
    newValue: PropTypes.string.isRequired,
    splitView: PropTypes.bool,
    disableWordDiff: PropTypes.bool,
    renderContent: PropTypes.func,
    onLineNumberClick: PropTypes.func,
    styles: PropTypes.object,
    hideLineNumbers: PropTypes.bool,
    highlightLines: PropTypes.arrayOf(PropTypes.string),
    reverse: PropTypes.bool
  }

  private splitView = (diffArray: diff.IDiffResult[], styles: IReactDiffViewerStyles) => {
    let leftLineNumber = 0
    let rightLineNumber = 0

    return () => diffArray.map((obj: diff.IDiffResult, i) => {
      return <React.Fragment key={i}>
        {
          obj.value.split('\n')
            .filter(ch => ch.length > 0)
            .map((ch, num) => {
              if (!obj.added && !obj.removed) {
                rightLineNumber = rightLineNumber + 1
                leftLineNumber = leftLineNumber + 1
                return <DefaultLine
                  styles={styles}
                  hideLineNumbers={this.props.hideLineNumbers}
                  leftLineNumber={leftLineNumber}
                  rightLineNumber={rightLineNumber}
                  leftContent={ch}
                  rightContent={ch}
                  key={num}
                  hightlightLines={this.props.highlightLines}
                  renderContent={this.props.renderContent}
                  onLineNumberClick={this.props.onLineNumberClick}
                  reverse={this.props.reverse}
                />
              }

              let leftContent
              let rightContent
              let removed = obj.removed
              let added = obj.added
              if (obj.added && diffArray[i - 1] && diffArray[i - 1].removed) {
                const preValueCount = diffArray[i - 1].count
                if (num <= (preValueCount - 1)) return undefined
                rightLineNumber = rightLineNumber + 1
                rightContent = ch
              } else if (obj.removed && diffArray[i + 1] && !diffArray[i + 1].added) {
                leftLineNumber = leftLineNumber + 1
                leftContent = ch
              } else if (obj.removed && diffArray[i + 1] && diffArray[i + 1].added) {
                leftLineNumber = leftLineNumber + 1
                const nextVal = diffArray[i + 1].value
                  .split('\n')
                  .filter(Boolean)[num]
                leftContent = (nextVal && !this.props.disableWordDiff)
                  ? wordDiff(ch, nextVal, 'added', styles, this.props.renderContent)
                  : ch
                rightContent = (nextVal && !this.props.disableWordDiff)
                  ? wordDiff(ch, nextVal, 'removed', styles, this.props.renderContent)
                  : nextVal
                if (nextVal) {
                  rightLineNumber = rightLineNumber + 1
                  added = true
                }
              } else {
                rightLineNumber = rightLineNumber + 1
                rightContent = ch
              }
              return <DefaultLine
                styles={styles}
                leftLineNumber={!removed || leftLineNumber}
                rightLineNumber={!added || rightLineNumber}
                removed={removed}
                added={added}
                key={num}
                hideLineNumbers={this.props.hideLineNumbers}
                hightlightLines={this.props.highlightLines}
                renderContent={this.props.renderContent}
                leftContent={leftContent}
                rightContent={rightContent}
                onLineNumberClick={this.props.onLineNumberClick}
                reverse={this.props.reverse}
              />
            })
        }
      </React.Fragment>
    })
  }

  private inlineView = (diffArray: diff.IDiffResult[], styles: IReactDiffViewerStyles) => {
    let leftLineNumber = 0
    let rightLineNumber = 0
    return () => {
      return diffArray.map((diffObj, i) => {
        return diffObj.value.split('\n')
          .filter(ch => ch.length > 0)
          .map((ch, num) => {
            let content
            if (diffObj.added) {
              rightLineNumber = rightLineNumber + 1
              if (diffArray[i - 1] && diffArray[i - 1].removed) {
                const preValue = diffArray[i - 1].value
                .split('\n')
                .filter(Boolean)[num]
                content = (preValue && !this.props.disableWordDiff) ? wordDiff(preValue, ch, 'removed', styles, this.props.renderContent) : ch
              } else {
                content = ch
              }
            } else if (diffObj.removed) {
              leftLineNumber = leftLineNumber + 1
              if (diffArray[i + 1] && diffArray[i + 1].added) {
                const nextVal = diffArray[i + 1].value
                .split('\n')
                .filter(Boolean)[num]
                content = (nextVal && !this.props.disableWordDiff) ? wordDiff(ch, nextVal, 'added', styles, this.props.renderContent) : ch
              } else {
                content = ch
              }
            } else {
              rightLineNumber = rightLineNumber + 1
              leftLineNumber = leftLineNumber + 1
              content = ch
            }
            return <InlineLine
              styles={styles}
              onLineNumberClick={this.props.onLineNumberClick}
              key={num}
              hideLineNumbers={this.props.hideLineNumbers}
              renderContent={this.props.renderContent}
              removed={diffObj.removed}
              leftLineNumber={diffObj.added || leftLineNumber}
              rightLineNumber={diffObj.removed || rightLineNumber}
              content={content}
              hightlightLines={this.props.highlightLines}
              added={diffObj.added}
            />
          })
      })
    }
  }

  private computeStyles = memoize(computeStyles)

  public render = () => {

    const {
      oldValue,
      newValue,
      splitView,
    } = this.props

    if (typeof oldValue !== 'string' || typeof newValue !== 'string') {
      throw Error('"oldValue" and "newValue" should be strings')
    }

    const newStyles: any = this.computeStyles(this.props.styles)

    const diffArray = diff.diffLines(oldValue, newValue, {
      newlineIsToken: true,
      ignoreWhitespace: false,
      ignoreCase: false,
    })

    const nodes = splitView
      ? this.splitView(diffArray, newStyles)()
      : this.inlineView(diffArray, newStyles)()

    return (
      <table className={newStyles.diffContainer}>
        <tbody>
          {nodes}
        </tbody>
      </table>
    )
  }
}

export default DiffViewer
export { IReactDiffViewerStylesOverride }
