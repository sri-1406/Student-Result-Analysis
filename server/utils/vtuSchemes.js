const vtuSchemes = {
  "2022": {
    "name": "2022 Scheme (OBE/CBCS)",
    "description": "The latest major scheme for VTU engineering batches introduced in 2022-23.",
    "streams": ["Computer Science (CSE)", "Information Science (ISE)", "Electrical", "Mechanical"],
    "semesters": {
      "sem1_2": [
        { "code": "BMATS101", "name": "Mathematics-I for Computer Science Stream", "credits": 4 },
        { "code": "BPHYS102", "name": "Applied Physics for CSE Stream", "credits": 4 },
        { "code": "BPOPS103", "name": "Principles of Programming using C", "credits": 3 },
        { "code": "BEECO104", "name": "Engineering Economics", "credits": 3 }
      ],
      "sem3": {
        "CSE": [
          { "code": "BCS301", "name": "Mathematics for Computer Science", "credits": 4 },
          { "code": "BCS302", "name": "Digital Design & Computer Organization", "credits": 4 },
          { "code": "BCS303", "name": "Operating Systems", "credits": 3 },
          { "code": "BCS304", "name": "Data Structures and Applications", "credits": 3 },
          { "code": "BCSL305", "name": "Data Structures Lab", "credits": 1 }
        ],
        "ISE": [
          { "code": "BCS301", "name": "Mathematics for Computer Science", "credits": 4 },
          { "code": "BCS302", "name": "Digital Design & Computer Organization", "credits": 4 },
          { "code": "BCS303", "name": "Operating Systems", "credits": 3 },
          { "code": "BCS304", "name": "Data Structures and Applications", "credits": 3 }
        ]
      },
      "sem4": {
        "CSE": [
          { "code": "BCS401", "name": "Analysis & Design of Algorithms", "credits": 4 },
          { "code": "BCS402", "name": "Microcontroller and Embedded System", "credits": 4 },
          { "code": "BCS403", "name": "Software Engineering", "credits": 3 },
          { "code": "BCSL404", "name": "Algorithms Lab", "credits": 1 }
        ]
      },
      "sem5": {
        "CSE": [
          { "code": "BCS501", "name": "Management and Entrepreneurship", "credits": 3 },
          { "code": "BCS502", "name": "Computer Networks", "credits": 4 },
          { "code": "BCS503", "name": "Theory of Computation", "credits": 3 },
          { "code": "BCSL504", "name": "Web Technology Lab", "credits": 1 },
          { "code": "BCS586", "name": "Mini Project", "credits": 2 }
        ]
      }
    }
  },
  "2023": {
    "name": "2023 Update (2022 Extension)",
    "description": "Continuation of the 2022 scheme with minor curriculum refinements.",
    "isContinuation": true,
    "base": "2022"
  }
};

module.exports = vtuSchemes;
