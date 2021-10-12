export type BAR =
    | 'Precedes'
    | 'Meets'
    | 'Overlaps'
    | 'Finished_by'
    | 'Contains'
    | 'Start'
    | 'Equal'
    | 'Started_by'
    | 'During'
    | 'Finishes'
    | 'Overlapped_by'
    | 'Met_by'
    | 'Preceded_by';

export const BooleanAlgebraRelations = {
    Precedes: 'Precedes',
    Meets: 'Meets',
    Overlaps: 'Overlaps',
    Finished_by: 'Finished by',
    Contains: 'Contains',
    Start: 'Start',
    Equal: 'Equal',
    Started_by: 'Started by',
    During: 'During',
    Finishes: 'Finishes',
    Overlapped_by: 'Overlapped by',
    Met_by: 'Met by',
    Preceded_by: 'Preceded by',
};

export const grammarQuestionForBAR = {
    Precedes: 'Does',
    Meets: 'Does',
    Overlaps: 'Does',
    Finished_by: 'Is',
    Contains: 'Does',
    Start: 'Does',
    Equal: 'Is',
    Started_by: 'Is',
    During: 'Is',
    Finishes: 'Does',
    Overlapped_by: 'Is',
    Met_by: 'Is',
    Preceded_by: 'Is',
};

export const enumOfBAR = {
    Precedes: 1,
    Meets: 2,
    Overlaps: 3,
    Finished_by: 4,
    Contains: 5,
    Start: 6,
    Equal: 7,
    Started_by: 8,
    During: 9,
    Finishes: 10,
    Overlapped_by: 11,
    Met_by: 12,
    Preceded_by: 13,
};
