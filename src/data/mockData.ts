import { AptitudeQuiz, CodingProblem, CampusDrive, TechnicalFlashcard, StudentProfile, MockInterviewSession } from '../types';

export const initialStudentProfile: StudentProfile = {
  id: 'std_101',
  name: 'Hariprasath N',
  email: 'hari.prasath@placementportal.edu',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  role: 'student',
  headline: 'Pre-final Year CSE Student | Aspiring Full Stack & Cloud SDE',
  bio: 'Passionate computer science undergraduate focusing on Data Structures, Algorithms, and Distributed Systems. Actively preparing for Tier-1 product and tech services campus hiring drives.',
  location: 'Chennai, Tamil Nadu',
  education: {
    college: 'Anna University / Top Engineering College',
    degree: 'Bachelor of Technology (B.Tech)',
    branch: 'Computer Science and Engineering',
    cgpa: 8.84,
    graduationYear: 2026,
    tenthPercentage: 94.6,
    twelfthPercentage: 92.4,
    standingArrears: 0,
  },
  skills: [
    { name: 'Data Structures & Algorithms', category: 'Core CS', proficiency: 85 },
    { name: 'JavaScript & TypeScript', category: 'Web', proficiency: 90 },
    { name: 'React.js & Node.js', category: 'Full Stack', proficiency: 88 },
    { name: 'Python', category: 'Programming', proficiency: 82 },
    { name: 'SQL & Database Design', category: 'Databases', proficiency: 80 },
    { name: 'Operating Systems & Networks', category: 'Core CS', proficiency: 78 },
    { name: 'System Design Basics', category: 'Architecture', proficiency: 70 },
  ],
  projects: [
    {
      id: 'p1',
      title: 'Distributed Cloud Task Scheduler',
      description: 'Engineered a high-throughput async task queue using Redis, Node.js worker pools, and Docker with 99.9% uptime under simulated load.',
      techStack: ['Node.js', 'Redis', 'Docker', 'PostgreSQL', 'Express'],
      githubUrl: 'https://github.com/example/cloud-scheduler',
      liveUrl: 'https://scheduler-demo.app'
    },
    {
      id: 'p2',
      title: 'AI Resume & ATS Parser',
      description: 'Built a transformer-based resume parsing engine that extracts key skills, computes match confidence score, and generates PDF reports.',
      techStack: ['Python', 'FastAPI', 'React', 'TailwindCSS'],
      githubUrl: 'https://github.com/example/resume-parser'
    }
  ],
  certifications: [
    {
      id: 'c1',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: '2024',
      credentialUrl: 'https://aws.amazon.com/verification'
    },
    {
      id: 'c2',
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Coursera / Meta',
      issueDate: '2023'
    }
  ],
  targetCompanies: ['Google', 'Amazon', 'Microsoft', 'TCS Digital', 'Infosys SP', 'Zoho'],
  targetRoles: ['Software Development Engineer (SDE-1)', 'Full Stack Developer', 'Cloud Associate'],
  readinessScore: 82,
  streakDays: 14,
  solvedProblemsCount: 148,
  quizzesCompletedCount: 26,
  interviewsTakenCount: 6,
  atsScore: 88,
  socialLinks: {
    github: 'https://github.com/hariprasath',
    linkedin: 'https://linkedin.com/in/hariprasath',
    leetcode: 'https://leetcode.com/hariprasath'
  }
};

export const mockAptitudeQuizzes: AptitudeQuiz[] = [
  {
    id: 'quiz-quant-1',
    title: 'Quantitative Aptitude Master Drill',
    description: 'Covers High-Frequency Campus Placement topics: Time & Work, Speed-Distance, Profit & Loss, and Percentages.',
    category: 'quantitative',
    difficulty: 'Intermediate',
    companyTag: 'TCS / Infosys / Cognizant',
    questionsCount: 5,
    durationMinutes: 10,
    questions: [
      {
        id: 'q1',
        category: 'quantitative',
        topic: 'Time and Work',
        difficulty: 'Medium',
        question: 'A can complete a piece of work in 12 days, and B can complete the same work in 18 days. If they work together for 4 days, what fraction of the work is left unfinished?',
        options: ['4/9', '5/9', '1/3', '7/18'],
        correctAnswer: 0,
        explanation: 'Work done by A in 1 day = 1/12. Work done by B in 1 day = 1/18. Together in 1 day = (1/12 + 1/18) = (3+2)/36 = 5/36. In 4 days, work done = 4 * (5/36) = 20/36 = 5/9. Remaining work = 1 - 5/9 = 4/9.',
        shortcutTip: 'Formula: Fraction remaining = 1 - (t * (A+B) / (A*B))'
      },
      {
        id: 'q2',
        category: 'quantitative',
        topic: 'Speed, Time and Distance',
        difficulty: 'Easy',
        question: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
        options: ['65 seconds', '89 seconds', '100 seconds', '75 seconds'],
        correctAnswer: 1,
        explanation: 'Speed of the train = Length of train / time to cross pole = 240 / 24 = 10 m/s. Total distance to cross platform = 240 + 650 = 890 m. Time taken = 890 / 10 = 89 seconds.',
        shortcutTip: 'Always add the train length to platform/bridge length for total distance.'
      },
      {
        id: 'q3',
        category: 'quantitative',
        topic: 'Profit and Loss',
        difficulty: 'Medium',
        question: 'A shopkeeper marks his goods at 40% above the cost price and allows a discount of 25% on the marked price. Find his profit percentage.',
        options: ['15%', '10%', '5%', '8%'],
        correctAnswer: 2,
        explanation: 'Let CP = 100. Marked Price (MP) = 140. Selling Price (SP) = 140 - 25% of 140 = 140 - 35 = 105. Profit = 105 - 100 = 5%.',
        shortcutTip: 'Effective formula: +40 - 25 - (40 * 25)/100 = 15 - 10 = +5% profit.'
      },
      {
        id: 'q4',
        category: 'quantitative',
        topic: 'Pipes and Cisterns',
        difficulty: 'Hard',
        question: 'Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both pipes are opened simultaneously, after how much time should pipe B be closed so that the tank is full in 15 minutes?',
        options: ['6 minutes', '7.5 minutes', '8 minutes', '10 minutes'],
        correctAnswer: 1,
        explanation: 'Pipe A remains open for the full 15 minutes. Work done by A in 15 min = 15/20 = 3/4. Remaining tank filled by B = 1 - 3/4 = 1/4. Time B was open = (1/4) / (1/30) = 30/4 = 7.5 minutes.',
        shortcutTip: 'Find constant runner first (Pipe A), then solve the delta for Pipe B.'
      },
      {
        id: 'q5',
        category: 'quantitative',
        topic: 'Permutations & Combinations',
        difficulty: 'Medium',
        question: 'In how many different ways can the letters of the word "LEADING" be arranged in such a way that the vowels always come together?',
        options: ['720', '360', '5040', '2160'],
        correctAnswer: 0,
        explanation: 'Word "LEADING" has 7 letters: 3 vowels (E, A, I) and 4 consonants (L, D, N, G). Treat (E, A, I) as 1 single block. We have 4 consonants + 1 block = 5 entities, arranged in 5! = 120 ways. The 3 vowels inside the block can be arranged in 3! = 6 ways. Total = 120 * 6 = 720 ways.',
        shortcutTip: 'Group together elements into a single bundle, calculate outer permutations, then multiply by inner permutations.'
      }
    ]
  },
  {
    id: 'quiz-logical-1',
    title: 'Logical Reasoning & Deduction',
    description: 'Syllogisms, Blood Relations, Coding-Decoding, and Seating Arrangement puzzles.',
    category: 'logical',
    difficulty: 'Intermediate',
    companyTag: 'Amazon / Wipro / Capgemini',
    questionsCount: 4,
    durationMinutes: 8,
    questions: [
      {
        id: 'lq1',
        category: 'logical',
        topic: 'Blood Relations',
        difficulty: 'Medium',
        question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
        options: ['Brother', 'Uncle', 'Father', 'Cousin'],
        correctAnswer: 2,
        explanation: 'Mother\'s only son = Suresh himself (since Suresh is speaking). Son of Suresh = Suresh\'s son. Therefore, Suresh is the father of the boy.',
        shortcutTip: 'Deconstruct backward: "My mother" -> "Only son of my mother" = Self -> "Son of self" = Son.'
      },
      {
        id: 'lq2',
        category: 'logical',
        topic: 'Coding-Decoding',
        difficulty: 'Easy',
        question: 'In a certain code language, if "SYSTEM" is written as "SYSMET" and "NEARER" is written as "AENRER", then how will "FRACTION" be written?',
        options: ['CARFNOIT', 'CARFTION', 'ARFCNOIT', 'ARFCITNO'],
        correctAnswer: 0,
        explanation: 'The word is divided into two equal halves of 4 letters each (FRAC and TION). The first half is reversed (CARF) and the second half is reversed (NOIT). Combined = CARFNOIT.',
        shortcutTip: 'Check if letters are inverted in chunks or symmetric halves.'
      },
      {
        id: 'lq3',
        category: 'logical',
        topic: 'Syllogisms',
        difficulty: 'Medium',
        question: 'Statements: (1) All mangoes are golden. (2) No golden things are cheap. Conclusions: (I) All mangoes are cheap. (II) Golden things are not mangoes. (III) Cheap things are not golden.',
        options: ['Only I follows', 'Only III follows', 'Both II and III follow', 'None follows'],
        correctAnswer: 1,
        explanation: 'From (1) & (2): Since all mangoes are inside golden, and golden is disjoint from cheap, no mango is cheap (I is false). Golden things can include mangoes (II is false). From (2), no golden things are cheap implies cheap things are not golden (III is valid contrapositive).',
        shortcutTip: 'Use Venn diagrams to quickly see overlapping and disjoint sets.'
      },
      {
        id: 'lq4',
        category: 'logical',
        topic: 'Number Series',
        difficulty: 'Hard',
        question: 'Find the missing number in the series: 7, 26, 63, 124, 215, ?',
        options: ['342', '343', '341', '512'],
        correctAnswer: 0,
        explanation: 'Pattern is n^3 - 1. 2^3 - 1 = 7; 3^3 - 1 = 26; 4^3 - 1 = 63; 5^3 - 1 = 124; 6^3 - 1 = 215; next is 7^3 - 1 = 343 - 1 = 342.',
        shortcutTip: 'Check cubes and squares plus or minus 1 when numbers grow quickly.'
      }
    ]
  },
  {
    id: 'quiz-cs-1',
    title: 'Core Computer Science Essentials',
    description: 'DBMS, Operating Systems, Computer Networks, and OOPs for Technical Rounds.',
    category: 'core_cs',
    difficulty: 'Advanced',
    companyTag: 'Product Companies (Google, Microsoft, Cisco)',
    questionsCount: 4,
    durationMinutes: 10,
    questions: [
      {
        id: 'cq1',
        category: 'core_cs',
        topic: 'DBMS',
        difficulty: 'Medium',
        question: 'Which normal form eliminates partial dependency of non-prime attributes on candidate keys?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswer: 1,
        explanation: 'Second Normal Form (2NF) requires the table to be in 1NF and have NO partial dependency, meaning every non-prime attribute must be fully functionally dependent on the primary key.',
        shortcutTip: '1NF: Atomic values; 2NF: No partial dependency; 3NF: No transitive dependency; BCNF: For every X->Y, X is a superkey.'
      },
      {
        id: 'cq2',
        category: 'core_cs',
        topic: 'Operating Systems',
        difficulty: 'Medium',
        question: 'Which of the following conditions is NOT one of the Coffman conditions required for a Deadlock to occur?',
        options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption Allowed', 'Circular Wait'],
        correctAnswer: 2,
        explanation: 'The 4 Coffman conditions for deadlock are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption (resources cannot be forcibly taken), 4. Circular Wait. "Preemption Allowed" actually prevents deadlocks.',
        shortcutTip: 'Remember "No Preemption" is required for deadlock.'
      },
      {
        id: 'cq3',
        category: 'core_cs',
        topic: 'Computer Networks',
        difficulty: 'Hard',
        question: 'What is the size of the TCP header with no optional fields included?',
        options: ['16 bytes', '20 bytes', '24 bytes', '32 bytes'],
        correctAnswer: 1,
        explanation: 'The minimum TCP header size is 20 bytes (5 32-bit words). With options, it can extend up to a maximum of 60 bytes.',
        shortcutTip: 'Both minimum IPv4 header and minimum TCP header are 20 bytes.'
      },
      {
        id: 'cq4',
        category: 'core_cs',
        topic: 'OOPs',
        difficulty: 'Easy',
        question: 'What is runtime polymorphism achieved through in C++ and Java?',
        options: ['Method Overloading', 'Method Overriding & Virtual Functions', 'Operator Overloading', 'Constructors'],
        correctAnswer: 1,
        explanation: 'Method Overriding with dynamic method dispatch (virtual functions in C++ or dynamic binding in Java) achieves runtime (late) polymorphism. Method overloading is compile-time (early) polymorphism.',
        shortcutTip: 'Overriding = Runtime; Overloading = Compile-time.'
      }
    ]
  }
];

export const mockCodingProblems: CodingProblem[] = [
  {
    id: 'code-1',
    title: 'Two Sum - Target Pair Indices',
    slug: 'two-sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    companyTags: ['Amazon', 'Google', 'TCS Digital', 'Microsoft', 'Adobe'],
    acceptanceRate: '49.2%',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.`,
    inputFormat: 'nums = [2,7,11,15], target = 9',
    outputFormat: '[0, 1]',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'nums[1] + nums[2] == 6, so indices [1, 2].'
      }
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Your code here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); ++i) {
        int complement = target - nums[i];
        if (seen.count(complement)) {
            return {seen[complement], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`
    },
    solutionExplanation: 'By using a Hash Map, we can store each visited number and its index. For every element, we check if `target - num` already exists in the map in O(1) time, giving an overall O(N) linear time complexity.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    testCases: [
      { input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]' },
      { input: '[3, 2, 4], 6', expectedOutput: '[1, 2]' },
      { input: '[3, 3], 6', expectedOutput: '[0, 1]' }
    ],
    hints: [
      'A brute force O(N^2) uses nested loops. Can we do better using extra space?',
      'Can you trade space for time using a Hash Map?',
      'Store each number index in a hash map as you iterate through the array.'
    ]
  },
  {
    id: 'code-2',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating',
    difficulty: 'Medium',
    category: 'Sliding Window',
    companyTags: ['Amazon', 'Google', 'Microsoft', 'Infosys SP', 'Oracle'],
    acceptanceRate: '34.8%',
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    inputFormat: 's = "abcabcbb"',
    outputFormat: '3',
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with length 3 ("pwke" is a subsequence, not a substring).'
      }
    ],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let left = 0;
  const set = new Set();
  
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}`,
      python: `def length_of_longest_substring(s: str) -> int:
    char_set = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len`,
      cpp: `#include <string>
#include <unordered_set>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_set<char> seen;
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.size(); ++right) {
        while (seen.count(s[right])) {
            seen.erase(s[left++]);
        }
        seen.insert(s[right]);
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      java: `import java.util.HashSet;
import java.util.Set;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> set = new HashSet<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            while (set.contains(s.charAt(right))) {
                set.remove(s.charAt(left++));
            }
            set.add(s.charAt(right));
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
    },
    solutionExplanation: 'We use a Sliding Window technique with two pointers `left` and `right` and a hash set. We expand `right` and shrink `left` whenever a duplicate character is encountered.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(min(N, M)) where M is character set size',
    testCases: [
      { input: '"abcabcbb"', expectedOutput: '3' },
      { input: '"bbbbb"', expectedOutput: '1' },
      { input: '"pwwkew"', expectedOutput: '3' }
    ],
    hints: [
      'Use a sliding window with two pointers.',
      'Maintain a set of characters currently in the window.',
      'When you see a duplicate, advance the left pointer until the duplicate is removed.'
    ]
  },
  {
    id: 'code-3',
    title: 'Valid Parentheses & Bracket Matching',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    companyTags: ['Amazon', 'TCS Ninja', 'Wipro', 'Infosys', 'Cisco'],
    acceptanceRate: '40.6%',
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.`,
    inputFormat: 's = "()[]{}"',
    outputFormat: 'true',
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.'
    ],
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    starterCode: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
      python: `def is_valid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
      cpp: `#include <string>
#include <stack>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            if (c == ')' && st.top() != '(') return false;
            if (c == '}' && st.top() != '{') return false;
            if (c == ']' && st.top() != '[') return false;
            st.pop();
        }
    }
    return st.empty();
}`,
      java: `import java.util.Stack;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`
    },
    solutionExplanation: 'Push opening brackets onto a LIFO stack. When a closing bracket arrives, verify that the top element is its matching opening bracket.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    testCases: [
      { input: '"()"', expectedOutput: 'true' },
      { input: '"()[]{}"', expectedOutput: 'true' },
      { input: '"(]"', expectedOutput: 'false' },
      { input: '"([)]"', expectedOutput: 'false' }
    ],
    hints: [
      'What data structure is Last-In-First-Out?',
      'Push matching closes onto the stack for simplicity.'
    ]
  },
  {
    id: 'code-4',
    title: 'Merge Intervals',
    slug: 'merge-intervals',
    difficulty: 'Medium',
    category: 'Arrays & Sorting',
    companyTags: ['Google', 'Amazon', 'Microsoft', 'Bloomberg', 'Uber'],
    acceptanceRate: '46.7%',
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    inputFormat: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
    outputFormat: '[[1,6],[8,10],[15,18]]',
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i <= end_i <= 10^4'
    ],
    examples: [
      {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]',
        explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].'
      },
      {
        input: 'intervals = [[1,4],[4,5]]',
        output: '[[1,5]]',
        explanation: 'Intervals [1,4] and [4,5] are considered overlapping.'
      }
    ],
    starterCode: {
      javascript: `function merge(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const prev = merged[merged.length - 1];
    const curr = intervals[i];
    if (curr[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], curr[1]);
    } else {
      merged.push(curr);
    }
  }
  return merged;
}`,
      python: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.empty()) return {};
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged = {intervals[0]};
    for (size_t i = 1; i < intervals.size(); ++i) {
        if (intervals[i][0] <= merged.back()[1]) {
            merged.back()[1] = max(merged.back()[1], intervals[i][1]);
        } else {
            merged.push_back(intervals[i]);
        }
    }
    return merged;
}`,
      java: `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();
        int[] current = intervals[0];
        merged.add(current);
        
        for (int[] interval : intervals) {
            if (interval[0] <= current[1]) {
                current[1] = Math.max(current[1], interval[1]);
            } else {
                current = interval;
                merged.add(current);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}`
    },
    solutionExplanation: 'Sort intervals by starting time. Then iterate and merge with the last interval if the current interval starts before or at the previous interval’s end.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    testCases: [
      { input: '[[1,3],[2,6],[8,10],[15,18]]', expectedOutput: '[[1,6],[8,10],[15,18]]' },
      { input: '[[1,4],[4,5]]', expectedOutput: '[[1,5]]' }
    ],
    hints: [
      'If the intervals were sorted by starting timestamp, how would that simplify things?',
      'Compare current interval start with previous interval end.'
    ]
  }
];

export const mockCampusDrives: CampusDrive[] = [
  {
    id: 'drive-1',
    companyName: 'Google',
    companyLogo: 'https://www.google.com/favicon.ico',
    role: 'Software Engineer - Campus Graduate',
    jobType: 'Full-Time',
    location: 'Bangalore / Hyderabad',
    ctc: '24 - 32 LPA',
    deadline: '2026-09-15',
    driveDate: '2026-09-22',
    eligibility: {
      minCgpa: 8.0,
      branches: ['CSE', 'IT', 'ECE', 'AI/DS'],
      maxBacklogs: 0,
      batch: 2026
    },
    description: 'Seeking top engineering talent proficient in algorithms, distributed computing, and system architecture to work on global products.',
    rounds: ['Online Coding Assessment (2 Problems)', 'Technical Round 1 (Data Structures)', 'Technical Round 2 (Algorithms & System Basics)', 'Googliness & Leadership Round'],
    status: 'Open',
    userApplicationStatus: 'Applied'
  },
  {
    id: 'drive-2',
    companyName: 'Amazon',
    companyLogo: 'https://images.unsplash.com/photo-1523474253243-283a0ed81406?auto=format&fit=crop&q=80&w=64',
    role: 'Software Development Engineer (SDE-1)',
    jobType: 'Full-Time',
    location: 'Chennai / Hyderabad / Bangalore',
    ctc: '18 - 28 LPA',
    deadline: '2026-09-10',
    driveDate: '2026-09-18',
    eligibility: {
      minCgpa: 7.5,
      branches: ['CSE', 'IT', 'ECE', 'EEE'],
      maxBacklogs: 0,
      batch: 2026
    },
    description: 'Work with Amazon retail, AWS, and logistics tech teams building high scalability microservices and real-time backend systems.',
    rounds: ['Online Assessment (Coding + Work Style Assessment)', 'Technical Round 1 (Problem Solving & DSA)', 'Technical Round 2 (OOPs & Low Level Design)', 'Bar Raiser / Amazon Leadership Principles'],
    status: 'Open',
    userApplicationStatus: 'OA Scheduled'
  },
  {
    id: 'drive-3',
    companyName: 'TCS Digital & Prime',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=64',
    role: 'Digital Software Engineer / Prime SDE',
    jobType: 'Full-Time',
    location: 'Pan India (Chennai, Bangalore, Pune)',
    ctc: '7.5 - 11.5 LPA',
    deadline: '2026-09-05',
    driveDate: '2026-09-12',
    eligibility: {
      minCgpa: 7.0,
      branches: ['All Engineering Branches'],
      maxBacklogs: 0,
      batch: 2026
    },
    description: 'Flagship hiring through TCS NQT for modern engineering roles across Cloud, AI/ML, Cybersecurity, and Web Engineering.',
    rounds: ['TCS National Qualifier Test (Cognitive + Advanced Coding)', 'Technical & Managerial Interview', 'HR Round'],
    status: 'Open',
    userApplicationStatus: 'Tech Round'
  },
  {
    id: 'drive-4',
    companyName: 'Infosys Specialist Programmer',
    companyLogo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=64',
    role: 'Specialist Programmer (SP) & DSE',
    jobType: 'Full-Time',
    location: 'Bangalore / Mysore / Chennai',
    ctc: '9.5 LPA',
    deadline: '2026-09-20',
    driveDate: '2026-09-28',
    eligibility: {
      minCgpa: 6.8,
      branches: ['CSE', 'IT', 'ECE'],
      maxBacklogs: 0,
      batch: 2026
    },
    description: 'High-speed problem solver role for elite competitive programmers. HackWithInfy / InfyTQ top performers drive.',
    rounds: ['Coding Assessment (3 Problems: Dynamic Programming & Graphs)', 'Deep Technical Interview', 'HR Fitment'],
    status: 'Upcoming',
    userApplicationStatus: 'Not Applied'
  },
  {
    id: 'drive-5',
    companyName: 'Zoho Corporation',
    companyLogo: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=64',
    role: 'Member Technical Staff (Software Developer)',
    jobType: 'Full-Time',
    location: 'Chennai / Tenkasi',
    ctc: '8.5 - 14 LPA',
    deadline: '2026-09-30',
    driveDate: '2026-10-05',
    eligibility: {
      minCgpa: 6.5,
      branches: ['All Branches'],
      maxBacklogs: 1,
      batch: 2026
    },
    description: 'Focuses heavily on strong C/C++/Java fundamentals, algorithmic logic without STL/built-in libraries, and application design.',
    rounds: ['Basic Aptitude & C/Java Debugging', 'Advanced Coding (5 Problems)', 'Application Design Round (L2)', 'HR & Fitment'],
    status: 'Upcoming',
    userApplicationStatus: 'Not Applied'
  }
];

export const mockTechnicalFlashcards: TechnicalFlashcard[] = [
  {
    id: 'fc-1',
    subject: 'DBMS',
    topic: 'ACID Properties',
    question: 'What are the ACID properties in database transactions, and how are they implemented?',
    answer: 'ACID guarantees reliability in database transactions:\n• Atomicity: All or nothing execution (via Undo/Redo logs).\n• Consistency: Database remains in valid state before and after transaction (via constraints/rules).\n• Isolation: Concurrent transactions do not interfere (via locking & MVCC).\n• Durability: Committed updates survive system crashes (via Write-Ahead Logging / WAL).',
    keyPoints: ['Atomicity (Undo log)', 'Consistency (Invariants)', 'Isolation (Locks/MVCC)', 'Durability (WAL)'],
    difficulty: 'Basic'
  },
  {
    id: 'fc-2',
    subject: 'Operating Systems',
    topic: 'Process vs Thread',
    question: 'What are the key architectural differences between a Process and a Thread?',
    answer: 'A Process is an independent executing program with its own dedicated virtual address space, file handles, and memory map.\nA Thread is a lightweight execution unit within a process. Multiple threads of the same process share code, data segment, and open files, but have their own Stack and Program Counter (PC). Context switching between threads is much faster than between processes.',
    keyPoints: ['Process has private memory', 'Threads share heap & code', 'Thread switch has lower overhead', 'Crash in thread can affect whole process'],
    difficulty: 'Basic'
  },
  {
    id: 'fc-3',
    subject: 'Computer Networks',
    topic: 'TCP 3-Way Handshake',
    question: 'Explain the TCP 3-Way Handshake process for establishing a reliable connection.',
    answer: '1. SYN: Client sends SYN packet with Initial Sequence Number (ISN_c) to server.\n2. SYN-ACK: Server receives SYN and responds with SYN flag set, its own ISN_s, and ACK = ISN_c + 1.\n3. ACK: Client sends ACK with ACK = ISN_s + 1. Connection is now ESTABLISHED and data transfer begins.',
    keyPoints: ['Step 1: SYN (c -> s)', 'Step 2: SYN-ACK (s -> c)', 'Step 3: ACK (c -> s)', 'Ensures bidirectional sync'],
    difficulty: 'Intermediate'
  },
  {
    id: 'fc-4',
    subject: 'OOP',
    topic: 'SOLID Principles',
    question: 'What do the 5 SOLID design principles stand for in object-oriented design?',
    answer: '• S: Single Responsibility Principle (A class should have only one reason to change).\n• O: Open/Closed Principle (Open for extension, closed for modification).\n• L: Liskov Substitution Principle (Subtypes must be substitutable for base types).\n• I: Interface Segregation (Clients shouldn\'t depend on unused interfaces).\n• D: Dependency Inversion (Depend on abstractions, not concrete implementations).',
    keyPoints: ['SRP: 1 responsibility', 'OCP: Extensible', 'LSP: Safe inheritance', 'ISP: Granular interfaces', 'DIP: Inversion of control'],
    difficulty: 'Advanced'
  },
  {
    id: 'fc-5',
    subject: 'System Design',
    topic: 'Horizontal vs Vertical Scaling',
    question: 'Compare Horizontal Scaling (Scale Out) vs Vertical Scaling (Scale Up).',
    answer: '• Vertical Scaling: Adding more power (CPU, RAM, Disk) to an existing machine. Simple, but has a hardware upper ceiling and single point of failure.\n• Horizontal Scaling: Adding more commodity servers behind a Load Balancer. Enables high availability, fault tolerance, and unlimited scaling, but requires distributed architecture, caching, and database sharding.',
    keyPoints: ['Scale Up: Bigger CPU/RAM', 'Scale Out: More machines + Load Balancer', 'Horizontal avoids Single Point of Failure'],
    difficulty: 'Intermediate'
  }
];

export const mockInterviewSessions: MockInterviewSession[] = [
  {
    id: 'interview-sde-1',
    title: 'Software Development Engineer - SDE 1 Technical Round',
    type: 'Technical DSA',
    companyTarget: 'Amazon / Google / Flipkart',
    durationMinutes: 20,
    questions: [
      {
        id: 'iq-1',
        category: 'Technical',
        difficulty: 'Junior',
        question: 'Could you introduce yourself and briefly describe your most challenging engineering project?',
        expectedKeywords: ['Tech stack', 'Architecture', 'Challenges solved', 'Metrics/Results', 'Trade-offs'],
        idealAnswer: 'Start with your education and primary tech stack, then pick a key project. Mention the goal, architectural decisions made (e.g. why Redis over memory cache), a bottleneck you resolved, and the measurable impact achieved.'
      },
      {
        id: 'iq-2',
        category: 'Technical',
        difficulty: 'Mid-Level',
        question: 'How would you detect a cycle in a singly linked list in O(1) extra space? Explain the mathematical intuition behind it.',
        expectedKeywords: ['Floyds Cycle Finding', 'Tortoise and Hare', 'Slow and Fast pointers', '2x speed'],
        idealAnswer: 'Use Floyd\'s Cycle Detection (Tortoise and Hare). Maintain two pointers, slow moving 1 step and fast moving 2 steps. If there is a cycle, the distance between them reduces by 1 in each iteration, ensuring they will meet in at most N steps.'
      },
      {
        id: 'iq-3',
        category: 'Core CS',
        difficulty: 'Mid-Level',
        question: 'What happens behind the scenes in the browser, OS, and network when you type "https://www.google.com" and press Enter?',
        expectedKeywords: ['DNS lookup', 'TCP 3-way handshake', 'TLS/SSL handshake', 'HTTP GET', 'DOM parsing', 'Rendering tree'],
        idealAnswer: '1. URL parsing & Browser DNS cache check -> OS cache -> Resolver -> Root/TLD -> Authoritative DNS.\n2. TCP 3-Way Handshake on port 443.\n3. TLS 1.3 cryptographic handshake for encryption.\n4. HTTP GET request sent -> Server processes via Load Balancer & Web Server -> Returns HTML/CSS/JS.\n5. Browser parses HTML to DOM, CSS to CSSOM, builds Render Tree, calculates Layout, and paints pixels.'
      }
    ]
  },
  {
    id: 'interview-hr-1',
    title: 'HR & Behavioral Interview (STAR Method)',
    type: 'HR & STAR Behavioral',
    companyTarget: 'All Companies (TCS, Infosys, Amazon, Microsoft)',
    durationMinutes: 15,
    questions: [
      {
        id: 'iq-hr-1',
        category: 'HR',
        difficulty: 'Junior',
        question: 'Tell me about a time when you faced a major roadblock during a team project and how you resolved it.',
        expectedKeywords: ['Situation', 'Task', 'Action', 'Result', 'Communication', 'Empathy'],
        idealAnswer: 'Use the STAR format: Explain the Situation (deadline, requirements), the Task assigned to you, the proactive Action you took (divided work, held sync calls, investigated bugs), and the positive Result (delivered on time, 98% accuracy).'
      },
      {
        id: 'iq-hr-2',
        category: 'HR',
        difficulty: 'Junior',
        question: 'Where do you see yourself in the next 3 to 5 years in our organization?',
        expectedKeywords: ['Technical mastery', 'Mentoring juniors', 'System ownership', 'Continuous learning', 'Company impact'],
        idealAnswer: 'In 3-5 years, I aim to master our tech stack, take end-to-end ownership of core system modules, mentor new campus hires, and contribute to high-impact architectural decisions.'
      }
    ]
  }
];
