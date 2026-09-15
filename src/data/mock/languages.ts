import { Language } from "@/types";

export const mockLanguages: Language[] = [
    {
        id: "python",
        name: "Python",
        monacoLanguage: "python",
        starterCode: `def solve():
    pass
`
    },
    {
        id: "cpp",
        name: "C++",
        monacoLanguage: "cpp",
        starterCode: `#include <bits/stdc++.h>
using namespace std;

int main() {
    return 0;
}
`
    },
    {
        id: "javascript",
        name: "JavaScript",
        monacoLanguage: "javascript",
        starterCode: `function solve() {

}
`
    }
];
