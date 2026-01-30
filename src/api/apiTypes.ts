import { IBoardsApi } from "./boards/boardsApiTypes";
import { ICardsApi } from "./cardsApi";

export interface IApi {
    boards: IBoardsApi
    cards: ICardsApi
}