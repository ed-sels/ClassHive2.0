import React, { createContext, useState, useEffect } from "react";

export const SchoolContext = createContext();

export const SchoolProvider = ({ children }) => {
  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem("classes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  const addClass = (className) => {
    const newClass = {
      id: Date.now().toString(),
      name: className,
      subjects: [],
      students: [],
    };
    setClasses((prev) => [...prev, newClass]);
  };

  const addSubjectToClass = (classId, subjectName) => {
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === classId
          ? { ...cls, subjects: [...cls.subjects, subjectName] }
          : cls
      )
    );
  };

  const addStudentToClass = (classId, studentName) => {
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === classId
          ? {
              ...cls,
              students: [
                ...cls.students,
                { id: Date.now().toString(), name: studentName, marks: {} },
              ],
            }
          : cls
      )
    );
  };

  // Renamed function to be clear and match your previous component
  const addOrUpdateStudentMark = (classId, studentId, subjectName, marks) => {
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === classId
          ? {
              ...cls,
              students: cls.students.map((stu) =>
                stu.id === studentId
                  ? {
                      ...stu,
                      marks: { ...stu.marks, [subjectName]: marks },
                    }
                  : stu
              ),
            }
          : cls
      )
    );
  };

  return (
    <SchoolContext.Provider
      value={{
        classes,
        addClass,
        addSubjectToClass,
        addStudentToClass,
        addOrUpdateStudentMark,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};
