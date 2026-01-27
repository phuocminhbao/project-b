export const HINT = {
    EXTRACT_POSITION: 1,
    RANGE_OF_ROOMS: 2,
    RELATIVE_DIRECTION: 3,
    RELATIVE_DIRECTION_DIAGONAL: 4,
    DISTANCE: 5,
    ROW_COLUMN_ALIGNMENT_FOX: 6,
    ROW_COLUMN_ALIGNMENT_HIDERS: 7,
    ROW_COLUMN_DIFF: 8,
    HIDING_AT_CONNER: 9,
    NOTTHNG: 10,
};

export const HINT_NAME = {
    [HINT.EXTRACT_POSITION]: "Knowing the extract position of duck/penguin",
    [HINT.RANGE_OF_ROOMS]: "Giving 4 rooms that duck/penguin is in atm",
    [HINT.RELATIVE_DIRECTION]:
        "Knowing if duck/penguin is up/down/left/right of fox",
    [HINT.RELATIVE_DIRECTION_DIAGONAL]:
        "Knowing if duck/penguin is upper-left/upper-right/lower-left/lower-right of fox",
    [HINT.DISTANCE]:
        "Knowing how many rooms that duck/penguin is far from fox atm",
    [HINT.ROW_COLUMN_ALIGNMENT_FOX]:
        "Knowing if fox is same row/column with duck/penguin",
    [HINT.ROW_COLUMN_ALIGNMENT_HIDERS]:
        "Knowing if duck is same row/column with penguin",
    [HINT.ROW_COLUMN_DIFF]:
        "Knowing exact rows and columns difference between fox and duck/penguin",
    [HINT.HIDING_AT_CONNER]: "Knowing if duck/penguin is hiding at conner",
    [HINT.NOTTHNG]: "Nothing",
};
