import { css } from '@emotion/react';
import { FileEarmarkCodeFill } from 'emotion-icons/bootstrap';
import { Folder } from 'emotion-icons/fluentui-system-filled';
import { DevProfileNode } from '../Tree';
import { useAppDispatch, useAppSelector } from '~/redux/store';
import { click } from '~/redux/features/popupSlice';

interface NodeProps {
  node: DevProfileNode;
}

const Node: React.FC<NodeProps> = ({ node }: NodeProps) => {
  const dispatch = useAppDispatch();
  const isClicked = useAppSelector((state) => state.popup.clickedNode);

  const clickNodeHandler = () => {
    if (node.isSelectable) {
      let orgCode = '';
      let modifiedCode = '';

      node.data?.content.split('\n').forEach((item, i) => {
        if (node.data?.status.deleted.find((code) => code === i + 1)) {
          orgCode += `${item}\n`;
        }

        if (node.data?.status.inserted.find((code) => code === i + 1)) {
          // orgCode += '\n';
          modifiedCode += `${item}\n`;
        }

        if (node.data?.status.original.find((code) => code === i + 1)) {
          orgCode += `${item}\n `;
          modifiedCode += `${item}\n`;
        }
      });

      dispatch(
        click({
          clickedNode: node,
          orgCode: orgCode,
          modifiedCode: modifiedCode,
        }),
      );
    }
  };

  return (
    <>
      {node.sort !== 'root' && (
        <div
          onClick={clickNodeHandler}
          onKeyDown={() => {}}
          role='button'
          tabIndex={0}
          css={css`
            display: flex;
            flex-flow: row nowrap;
            width: 100%;
            align-items: center;
            gap: 0 0.5rem;
            padding-left: ${(node.depth - 1) * 1.75}rem;
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
            font-size: 0.875rem;
            background-color: ${isClicked?.id === node.id ? '#eee' : ''};
            cursor: ${node.isSelectable ? 'pointer' : ''};

            &: hover {
              background-color: #eee;
            }
          `}
        >
          {/* <FolderOpen size={25} /> */}
          {node.sort === 'folder' ? (
            <Folder color='white' size={20} />
          ) : (
            <FileEarmarkCodeFill size={20} />
          )}
          {/* <FileEarmarkCodeFill /> */}
          <p>{node.name}</p>
        </div>
      )}

      {node.children?.map((child) => (
        <Node key={child.name} node={child} />
      ))}
    </>
  );
};

export default Node;
