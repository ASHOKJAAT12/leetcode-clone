import { Problem } from "@/types";

export const mockProblems: Problem[] = [
    {
        id: "p1",
        slug: "smart-parking-slot-allocation",
        title: "Smart Parking Slot Allocation",
        difficulty: "Medium",
        category: "Smart City",
        tags: ["Hash Map", "Arrays", "Data Processing"],
        acceptanceRate: 54.2,
        expectedSkills: ["Hash Maps", "Logic Building"],
        description: `## Real-world scenario
In a smart city, parking slots are equipped with sensors. You receive a continuous stream of parking events.
Your task is to track currently available slots and efficiently allocate the nearest slot conceptually based on proximity.

## Input Format
An array of operations.

## Expected Output
Return an array of integers representing the slot assigned for each incoming request.

## Constraints
- Max 10,000 slots.`
    },
    {
        id: "p2",
        slug: "ecommerce-billing",
        title: "E-Commerce Billing",
        difficulty: "Easy",
        category: "E-Commerce",
        tags: ["Arrays", "Math"],
        acceptanceRate: 82.1,
    },
    {
        id: "p3",
        slug: "hospital-queue",
        title: "Hospital Queue",
        difficulty: "Hard",
        category: "Healthcare",
        tags: ["Priority Queue", "Sorting"],
        acceptanceRate: 31.4,
    },
    {
        id: "p4",
        slug: "order-analytics",
        title: "Order Analytics",
        difficulty: "Easy",
        category: "E-Commerce",
        tags: ["Hash Map", "Sorting"],
        acceptanceRate: 75.3,
    }
];
