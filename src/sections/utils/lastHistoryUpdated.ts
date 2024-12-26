import { type HistoryApiResponse } from "../../modules/shared/domain/types/responseTypes";

export function lastHistoryUpdated(history: HistoryApiResponse[]) {
    return history.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
}