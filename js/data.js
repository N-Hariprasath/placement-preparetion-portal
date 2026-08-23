/* ApexHire AI - Database & Datasets */

const AppData = {
  // 1. Coding Problems Database
  codingProblems: [
    {
      id: "prob-1",
      title: "Two Sum",
      difficulty: "Easy",
      category: "Arrays & Hashing",
      company: "Google / Amazon",
      description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`. You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
      examples: [
        { input: "nums = [2,7,11,15], target = 9", output: "[0, 1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
        { input: "nums = [3,2,4], target = 6", output: "[1, 2]", explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]." }
      ],
      templates: {
        javascript: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        let diff = target - nums[i];\n        if (map.has(diff)) {\n            return [map.get(diff), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}`,
        python: `def two_sum(nums, target):\n    hash_map = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in hash_map:\n            return [hash_map[diff], i]\n        hash_map[num] = i\n    return []`,
        cpp: `#include <vector>\n#include <unordered_map>\n\nstd::vector<int> twoSum(std::vector<int>& nums, int target) {\n    std::unordered_map<int, int> mp;\n    for(int i = 0; i < nums.size(); i++) {\n        int complement = target - nums[i];\n        if(mp.find(complement) != mp.end()) return {mp[complement], i};\n        mp[nums[i]] = i;\n    }\n    return {};\n}`,
        java: `import java.util.HashMap;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        HashMap<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`
      },
      testCases: [
        { input: "[2, 7, 11, 15], 9", expected: "[0, 1]" },
        { input: "[3, 2, 4], 6", expected: "[1, 2]" },
        { input: "[3, 3], 6", expected: "[0, 1]" }
      ]
    },
    {
      id: "prob-2",
      title: "Valid Anagram",
      difficulty: "Easy",
      category: "Strings",
      company: "Amazon / Microsoft",
      description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise. An Anagram is a word formed by rearranging the letters of a different word.`,
      examples: [
        { input: "s = \"anagram\", t = \"nagaram\"", output: "true" },
        { input: "s = \"rat\", t = \"car\"", output: "false" }
      ],
      templates: {
        javascript: `function isAnagram(s, t) {\n    if (s.length !== t.length) return false;\n    const count = {};\n    for (let char of s) count[char] = (count[char] || 0) + 1;\n    for (let char of t) {\n        if (!count[char]) return false;\n        count[char]--;\n    }\n    return true;\n}`,
        python: `def is_anagram(s: str, t: str) -> bool:\n    if len(s) != len(t):\n        return False\n    from collections import Counter\n    return Counter(s) == Counter(t)`
      },
      testCases: [
        { input: '"anagram", "nagaram"', expected: "true" },
        { input: '"rat", "car"', expected: "false" }
      ]
    },
    {
      id: "prob-3",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      category: "Sliding Window",
      company: "Google / Meta",
      description: `Given a string \`s\`, find the length of the longest substring without repeating characters.`,
      examples: [
        { input: "s = \"abcabcbb\"", output: "3", explanation: "The answer is \"abc\", with the length of 3." },
        { input: "s = \"bbbbb\"", output: "1", explanation: "The answer is \"b\", with the length of 1." }
      ],
      templates: {
        javascript: `function lengthOfLongestSubstring(s) {\n    let set = new Set();\n    let left = 0;\n    let maxLen = 0;\n    for (let right = 0; right < s.length; right++) {\n        while (set.has(s[right])) {\n            set.delete(s[left]);\n            left++;\n        }\n        set.add(s[right]);\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`,
        python: `def length_of_longest_substring(s: str) -> int:\n    char_set = set()\n    left = 0\n    max_len = 0\n    for right in range(len(s)):\n        while s[right] in char_set:\n            char_set.remove(s[left])\n            left += 1\n        char_set.add(s[right])\n        max_len = max(max_len, right - left + 1)\n    return max_len`
      },
      testCases: [
        { input: '"abcabcbb"', expected: "3" },
        { input: '"bbbbb"', expected: "1" },
        { input: '"pwwkew"', expected: "3" }
      ]
    },
    {
      id: "prob-4",
      title: "Maximum Subarray (Kadane's Algo)",
      difficulty: "Medium",
      category: "Dynamic Programming",
      company: "TCS Digital / Infosys / Amazon",
      description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
      examples: [
        { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." }
      ],
      templates: {
        javascript: `function maxSubArray(nums) {\n    let maxVal = nums[0];\n    let currVal = nums[0];\n    for (let i = 1; i < nums.length; i++) {\n        currVal = Math.max(nums[i], currVal + nums[i]);\n        maxVal = Math.max(maxVal, currVal);\n    }\n    return maxVal;\n}`,
        python: `def max_sub_array(nums):\n    max_sum = curr_sum = nums[0]\n    for num in nums[1:]:\n        curr_sum = max(num, curr_sum + num)\n        max_sum = max(max_sum, curr_sum)\n    return max_sum`
      },
      testCases: [
        { input: "[-2,1,-3,4,-1,2,1,-5,4]", expected: "6" },
        { input: "[1]", expected: "1" },
        { input: "[5,4,-1,7,8]", expected: "23" }
      ]
    }
  ],

  // 2. Aptitude & Technical MCQs Database
  assessments: [
    {
      id: "apt-1",
      title: "Quantitative Aptitude Mock Test",
      category: "Quantitative",
      durationMins: 15,
      questions: [
        {
          id: "q1",
          question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
          options: ["120 metres", "150 metres", "180 metres", "324 metres"],
          answer: 1,
          explanation: "Speed = 60 * (5/18) m/sec = 50/3 m/sec. Distance = Speed * Time = (50/3) * 9 = 150 metres."
        },
        {
          id: "q2",
          question: "The ratio between the length and the breadth of a rectangular park is 3 : 2. If a man cycling along the boundary of the park at 12 km/hr completes one round in 8 minutes, then the area of the park (in sq. m) is:",
          options: ["153600", "15360", "307200", "None of these"],
          answer: 0,
          explanation: "Perimeter = Distance covered in 8 min = 12 * (1000/60) * 8 = 1600 m. 2(3x + 2x) = 1600 => 10x = 1600 => x = 160. Area = 3x * 2x = 6x^2 = 6 * 160^2 = 153,600 sq. m."
        },
        {
          id: "q3",
          question: "A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. The sum is:",
          options: ["Rs. 650", "Rs. 690", "Rs. 698", "Rs. 700"],
          answer: 2,
          explanation: "Simple Interest for 1 year = 854 - 815 = Rs. 39. SI for 3 years = 39 * 3 = Rs. 117. Principal = 815 - 117 = Rs. 698."
        }
      ]
    },
    {
      id: "apt-2",
      title: "CS Fundamentals & Core Technical Test",
      category: "Technical Core",
      durationMins: 20,
      questions: [
        {
          id: "t1",
          question: "Which of the following process scheduling algorithm may lead to starvation?",
          options: ["Round Robin", "First Come First Serve", "Shortest Job First", "None of the above"],
          answer: 2,
          explanation: "Shortest Job First (SJF) gives priority to shorter processes, which can cause longer processes to suffer starvation indefinitely."
        },
        {
          id: "t2",
          question: "In relational database design, 3NF (Third Normal Form) eliminates:",
          options: ["Redundant tuple values", "Transitive dependencies", "Partial dependencies", "Multivalued dependencies"],
          answer: 1,
          explanation: "1NF removes atomic values; 2NF eliminates partial dependencies; 3NF eliminates transitive dependencies."
        },
        {
          id: "t3",
          question: "Which layer of the OSI reference model is responsible for end-to-end packet delivery and logical addressing?",
          options: ["Data Link Layer", "Network Layer", "Transport Layer", "Session Layer"],
          answer: 1,
          explanation: "Network Layer handles logical addressing (IP addresses) and routing of packets end-to-end across networks."
        }
      ]
    }
  ],

  // 3. Company Prep Tracks
  companyTracks: [
    {
      id: "google",
      name: "Google India",
      role: "Software Development Engineer (SDE-1)",
      avgPackage: "₹32 - ₹45 LPA",
      diffLevel: "High",
      logoIcon: "fa-brands fa-google",
      color: "#4285F4",
      rounds: [
        "Online Challenge (OA): 2 Algorithmic DSA problems (90 mins)",
        "Technical Interview 1: Data Structures & Problem Solving",
        "Technical Interview 2: System Design & Algorithms",
        "Googleyness & Leadership: Scenario-based behavioral assessment"
      ],
      mustPrepare: ["Graphs & BFS/DFS", "Dynamic Programming", "Tries & Heaps", "System Design Basics"]
    },
    {
      id: "amazon",
      name: "Amazon",
      role: "SDE-1 / AWS Cloud Engineer",
      avgPackage: "₹28 - ₹42 LPA",
      diffLevel: "High",
      logoIcon: "fa-brands fa-amazon",
      color: "#FF9900",
      rounds: [
        "Online Assessment: 2 Coding Qs + 14 Leadership Principles MCQs",
        "Technical Round 1: Array/String Manipulation & Code Quality",
        "Technical Round 2: Trees, Graphs, Object-Oriented Design",
        "Bar Raiser Round: Deep Dive into Past Projects & Leadership Principles"
      ],
      mustPrepare: ["Amazon 16 Leadership Principles", "Binary Trees & BST", "Sliding Window", "OOD / UML"]
    },
    {
      id: "tcs",
      name: "TCS (Digital & Prime)",
      role: "Systems Engineer / Digital Innovator",
      avgPackage: "₹7 - ₹11.5 LPA",
      diffLevel: "Medium",
      logoIcon: "fa-solid fa-building",
      color: "#0072C6",
      rounds: [
        "TCS NQT Online Exam: Aptitude, English, Reasoning, Advanced Coding",
        "Technical Interview: Core Java/Python, DBMS SQL Queries, Project Qs",
        "Managerial & HR Interview: Communication, Location Flexibility"
      ],
      mustPrepare: ["Advanced Quantitative Aptitude", "SQL Joins & Indexing", "OOPs Concepts", "Data Structures"]
    },
    {
      id: "infosys",
      name: "Infosys (Specialist Programmer)",
      role: "Specialist Programmer / DSE",
      avgPackage: "₹9.5 - ₹13 LPA",
      diffLevel: "Medium-High",
      logoIcon: "fa-solid fa-laptop-code",
      color: "#007CC33",
      rounds: [
        "HackWithInfy / InfyTQ Test: 3 Competitive Coding Problems",
        "Technical Interview: Code optimization, DSA dry run, DBMS",
        "HR Interview: College background, certifications, teamwork"
      ],
      mustPrepare: ["Dynamic Programming", "Graph Traversal", "DBMS Normalization", "Python/Java Mastery"]
    }
  ],

  // 4. CS Fundamentals Flashcards
  flashcards: [
    {
      subject: "Operating Systems",
      question: "What is a Deadlock and what are the 4 necessary conditions for it?",
      answer: "A Deadlock occurs when a set of processes are blocked because each process holds a resource and waits for another resource held by another process.\n\n4 Conditions:\n1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait"
    },
    {
      subject: "DBMS",
      question: "Difference between WHERE and HAVING clause in SQL?",
      answer: "WHERE clause filters individual rows before any grouping occurs.\nHAVING clause filters groups created by the GROUP BY clause after aggregation."
    },
    {
      subject: "Computer Networks",
      question: "What happens when you type google.com in browser address bar?",
      answer: "1. DNS lookup translates domain to IP address.\n2. Browser initiates TCP 3-way handshake with IP (SYN, SYN-ACK, ACK).\n3. TLS negotiation for HTTPS.\n4. HTTP GET request sent to server.\n5. Server returns HTML/JS payload."
    },
    {
      subject: "Object-Oriented Programming",
      question: "Explain Polymorphism with Compile-time vs Runtime examples.",
      answer: "Polymorphism means 'many forms'.\n- Compile-time (Static): Method Overloading (same method name, different parameter signature).\n- Runtime (Dynamic): Method Overriding (subclass provides specific implementation of parent class method using virtual/@Override)."
    }
  ],

  // 5. AI Interview Question Bank
  interviewScenarios: {
    frontend: [
      "Tell me about yourself and your experience with modern JavaScript frameworks.",
      "How do you optimize a web app's initial load time and dynamic bundle size?",
      "Explain Event Delegation and how Event Bubbling works in JavaScript.",
      "How would you handle global state management in a large-scale React application?"
    ],
    backend: [
      "Walk me through how you design RESTful APIs for high concurrency.",
      "What is the difference between SQL and NoSQL databases, and when would you choose DynamoDB or MongoDB over PostgreSQL?",
      "How do you implement JWT Authentication and handle session expiration safely?",
      "How do you handle database transaction concurrency and avoid race conditions?"
    ],
    behavioral: [
      "Describe a situation where you faced a significant conflict during a team project. How did you resolve it?",
      "Tell me about a time your code failed in testing or production. What did you learn?",
      "Give an example of a goal you set for yourself and how you achieved it under a tight deadline."
    ]
  }
};
