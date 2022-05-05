import { FC } from 'react';
import {
    FontWeights,
    getTheme,
    IconButton,
    mergeStyleSets,
    Modal,
} from '@fluentui/react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';
import styled from '@emotion/styled';

export type OrderOfRelationsProps = {
    relation: string;
    orderOfRelations: string[];
    setOrderOfRelations: (rel: string, orderOfRelations: string[]) => void;
    isOpen: boolean;
    toggleHideDialog: () => void;
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
    header: [
        theme.fonts.large,
        {
            flex: '1 1 auto',
            borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralLight,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 14px 24px',
        },
    ],
    body: {
        flex: '4 4 auto',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
});

export type QuoteType = {
    id: string;
    content: string;
};

const reorder = (list: QuoteType[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

type QuoteProps = {
    quote: QuoteType;
    index: number;
};

const Quote: FC<QuoteProps> = ({ quote, index }) => {
    const QuoteItem = styled.div`
        border: 1px dashed grey;
        margin-bottom: 8px;
        background-color: #5a96ff;
        padding: 8px;
    `;
    return (
        <Draggable draggableId={quote.id} index={index}>
            {(provided) => (
                <QuoteItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {quote.content}
                </QuoteItem>
            )}
        </Draggable>
    );
};

type QuoteListProps = {
    quotes: QuoteType[];
};

const QuoteList: FC<QuoteListProps> = ({ quotes }) => {
    return (
        <>
            {quotes.map((quote: QuoteType, index: number) => (
                <Quote quote={quote} index={index} key={quote.id} />
            ))}
        </>
    );
};

export const OrderOfRelations: FC<OrderOfRelationsProps> = ({
    relation,
    orderOfRelations,
    setOrderOfRelations,
    isOpen,
    toggleHideDialog,
}) => {
    const relationKeys = orderOfRelations.map((rel, i) => ({
        id: `rel-${i}`,
        content: rel.toString().replace('_', ' '),
    }));

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        if (result.destination.index === result.source.index) {
            return;
        }
        const newOrderOfRelations = reorder(
            relationKeys,
            result.source.index,
            result.destination.index
        );
        const newRels = newOrderOfRelations.map((item) =>
            item.content.replace(' ', '_')
        );
        setOrderOfRelations(relation, newRels);
    };

    return (
        <Modal
            isOpen={isOpen}
            onDismiss={toggleHideDialog}
            containerClassName={contentStyles.container}
        >
            <div className={contentStyles.header}>
                <span>Modify order of relations</span>
                <IconButton
                    styles={{
                        root: {
                            color: theme.palette.neutralPrimary,
                            marginLeft: 'auto',
                            marginTop: '4px',
                            marginRight: '2px',
                        },
                        rootHovered: {
                            color: theme.palette.neutralDark,
                        },
                    }}
                    iconProps={{ iconName: 'Cancel' }}
                    ariaLabel="Close popup modal"
                    onClick={toggleHideDialog}
                />
            </div>
            <div className={contentStyles.body}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="list">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <QuoteList quotes={relationKeys} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </Modal>
    );
};
