// import React from "react";

/**
 * DSA Roadmap Component
 * 
 * This component provides a categorized roadmap for learning Data Structures and Algorithms (DSA).
 * Each category contains essential topics along with relevant learning resources.
 */

const dsaRoadmap = [
    {
      category: "Basics",
      topics: [
        { name: "Time Complexity & Space Complexity", link: "https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/" },
        { name: "Bit Manipulation", link: "https://www.geeksforgeeks.org/bitwise-operators-in-c-cpp/" },
        { name: "Recursion & Backtracking", link: "https://www.geeksforgeeks.org/recursion/" }
      ]
    },
    {
      category: "Data Structures",
      topics: [
        { name: "Arrays & Strings", link: "https://www.geeksforgeeks.org/array-data-structure/" },
        { name: "Linked List", link: "https://www.geeksforgeeks.org/data-structures/linked-list/" },
        { name: "Stacks & Queues", link: "https://www.geeksforgeeks.org/stack-data-structure/" },
        { name: "Trees & Binary Trees", link: "https://www.geeksforgeeks.org/binary-tree-data-structure/" },
        { name: "Binary Search Trees", link: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/" },
        { name: "Heaps & Priority Queues", link: "https://www.geeksforgeeks.org/heap-data-structure/" },
        { name: "Graphs & Graph Traversal Algorithms", link: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" }
      ]
    },
    {
      category: "Algorithms",
      topics: [
        { name: "Sorting Algorithms", link: "https://www.geeksforgeeks.org/sorting-algorithms/" },
        { name: "Searching Algorithms", link: "https://www.geeksforgeeks.org/searching-algorithms/" },
        { name: "Dynamic Programming", link: "https://www.geeksforgeeks.org/dynamic-programming/" },
        { name: "Greedy Algorithms", link: "https://www.geeksforgeeks.org/greedy-algorithms/" },
        { name: "Divide and Conquer", link: "https://www.geeksforgeeks.org/divide-and-conquer/" },
        { name: "Graph Algorithms", link: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" },
        { name: "Trie & Suffix Tree", link: "https://www.geeksforgeeks.org/trie-insert-and-search/" }
      ]
    },
    {
      category: "Advanced Topics",
      topics: [
        { name: "Segment Trees", link: "https://www.geeksforgeeks.org/segment-tree-set-1-sum-of-given-range/" },
        { name: "Fenwick Tree / Binary Indexed Tree", link: "https://www.geeksforgeeks.org/binary-indexed-tree-or-fenwick-tree-2/" },
        { name: "Disjoint Set Union (DSU)", link: "https://www.geeksforgeeks.org/disjoint-set-union-find/" },
        { name: "KMP Algorithm & String Matching", link: "https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/" }
      ]
    },
    {
      category: "Interview Preparation",
      topics: [
        { name: "System Design Basics", link: "https://www.geeksforgeeks.org/system-design-tutorial/" },
        { name: "Problem Solving Techniques", link: "https://www.geeksforgeeks.org/problem-solving-in-data-structures-algorithms-using-java/" },
        { name: "Mock Interviews", link: "https://www.pramp.com/" }
      ]
    }
  ];
  
  /**
   * DsaRoadmap Component
   * 
   * Renders a structured roadmap for DSA with categories and links to learning resources.
   */
  const DsaRoadmap = () => {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-white">DSA Roadmap</h1>
        {dsaRoadmap.map((section, index) => (
          <div key={index} className="mb-6 p-4 bg-blue-900 translate-y-0 transition-all rounded-lg shadow">
            <h2 className="text-white font-semibold mb-2">{section.category}</h2>
            <ul className="list-disc list-inside">
              {section.topics.map((topic, i) => (
                <li key={i} className="text-white">
                  <a href={topic.link} target="_blank" rel="noopener noreferrer" className="text-white/90 underline">
                    {topic.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  export default DsaRoadmap;