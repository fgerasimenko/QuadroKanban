import { IGetBoardByIdParam, ISearchBoardParam } from "./params/boardsParams";

export interface IBoardsApi {
    public: {
        getById(param: IGetBoardByIdParam): Promise<any>;
        search(param: ISearchBoardParam): Promise<any>;
    }
}

