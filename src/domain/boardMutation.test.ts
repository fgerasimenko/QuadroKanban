import { describe, expect, it } from "vitest";
import type { Task } from "@/types/taskTypes";
import { moveCardToStatus } from "@/domain/boardMutation";

describe("moveCardToStatus", () => {
  it("moves a task to another status and updates its order", () => {
    const base: Omit<Task, "id" | "order" | "status" | "assignedTo"> = {
      title: "T",
      shortDescription: "",
      longDescription: "L",
      priority: "LOW",
      deadline: new Date("2026-02-01"),
      createdAt: new Date("2026-01-01"),
      updatedAt: new Date("2026-01-01"),
      archived: false,
    };

    const tasks: Task[] = [
      {
        ...base,
        id: "t1",
        order: 0,
        status: "TODO",
        assignedTo: { id: "user-1", name: "User" },
      },
      {
        ...base,
        id: "t2",
        order: 0,
        status: "DOING",
        assignedTo: { id: "user-1", name: "User" },
      },
      {
        ...base,
        id: "t3",
        order: 1,
        status: "DOING",
        assignedTo: { id: "user-1", name: "User" },
      },
    ];

    const next = moveCardToStatus(tasks, "t1", "DOING", "user-1");

    const moved = next.find((t) => t.id === "t1")!;
    const doing = next.filter((t) => t.status === "DOING").sort((a, b) => a.order - b.order);

    expect(moved.status).toBe("DOING");
    expect(moved.order).toBe(2);
    expect(doing.map((t) => t.id)).toEqual(["t2", "t3", "t1"]);
  });
});
