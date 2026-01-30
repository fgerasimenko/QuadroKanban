export interface IGetBoardByIdParam {
    idBoard: string;
}

export interface ISearchBoardParam {
    idBoard?: string;
    boardName?: string;
    boardDescription?: string;
    createdAt?: string
}