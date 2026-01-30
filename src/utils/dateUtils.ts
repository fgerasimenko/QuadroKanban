export function formatDate(datestring: string) {
  const date = new Date(datestring);
  if (Number.isNaN(date.getTime())) { return datestring; }
  return date.toLocaleDateString();
}

export function dateToString(date: Date): string {
    return date.toLocaleDateString()
}

export function toDate(datestring: string): Date | null {
  if (!datestring) return null;
  const date = new Date(datestring);
  
  if (Number.isNaN(date.getTime())) { return null; }

  return date
}

export function toInputDate(date?: Date) {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};



