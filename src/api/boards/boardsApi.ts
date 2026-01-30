import { IBoardsApi } from "./boardsApiTypes";
import { IGetBoardByIdParam, ISearchBoardParam } from "./types/params";



export const boardsApi = (): IBoardsApi => ({
    public: {

        getById(param: IGetBoardByIdParam): Promise<any>;
        async search(param: ISearchBoardParam): Promise<ISearchSessionResponse> {
            const { namespaceId } = app.$state;
            const params = { ...param };
            if (params.revoked === undefined || params.revoked === <any>'all') {
                delete params.revoked;
            }
            return $axios.$get(`/admin/${namespaceId}/auth`, { params });
        },
    }
})

