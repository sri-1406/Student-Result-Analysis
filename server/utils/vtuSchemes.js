const vtuSchemes = {
  "2022": {
    "name": "2022 Scheme (OBE/CBCS)",
    "streams": ["Civil", "Computer Science", "Electrical", "Mechanical"],
    "commonSubjects": {
      "sem1_2": [
        { "code": "BMATS101", "name": "Mathematics-I for Computer Science Stream" },
        { "code": "BPHYS102", "name": "Applied Physics for CSE Stream" },
        { "code": "BPOPS103", "name": "Principles of Programming using C" }
      ],
      "sem3": {
        "CSE": [
          { "code": "BCS301", "name": "Mathematics for Computer Science" },
          { "code": "BCS302", "name": "Digital Design & Computer Organization" },
          { "code": "BCS303", "name": "Operating Systems" },
          { "code": "BCS304", "name": "Data Structures and Applications" }
        ]
      }
    }
  },
  "2021": {
    "name": "2021 Scheme (OBE/CBCS)",
    "semesters": {
      "sem3": {
        "CSE": [
          { "code": "21MAT31", "name": "Transform Calculus, Fourier Series & Numerical Techniques" },
          { "code": "21CS32", "name": "Data Structures and Applications" },
          { "code": "21CS33", "name": "Analog and Digital Electronics" },
          { "code": "21CS34", "name": "Computer Organization and Architecture" }
        ]
      },
      "sem4": {
        "CSE": [
          { "code": "21CS41", "name": "Mathematical Foundations for Computing" },
          { "code": "21CS42", "name": "Design and Analysis of Algorithms" },
          { "code": "21CS43", "name": "Microcontroller and Embedded Systems" },
          { "code": "21CS44", "name": "Operating Systems" }
        ]
      }
    }
  },
  "2018": {
    "name": "2018 Scheme (CBCS)",
    "sections": {
      "sem5": {
        "CSE": [
          { "code": "18CS51", "name": "Management, Entrepreneurship for IT Industry" },
          { "code": "18CS52", "name": "Computer Networks and Security" },
          { "code": "18CS53", "name": "Database Management System" },
          { "code": "18CS54", "name": "Application Development using Python" }
        ]
      }
    }
  }
};

module.exports = vtuSchemes;
