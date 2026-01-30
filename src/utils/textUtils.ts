import { TaskStatus } from "@/types/taskTypes";

export function includesText(searchedText: string, textToSearch: string) {
  return searchedText.toLowerCase().includes(textToSearch.toLowerCase());
}

export function statusToText(status: TaskStatus) {
  return status === "TODO" ? "A fazer" 
          : status === "DOING" ? "Em Andamento"
          : "Concluído"
}
