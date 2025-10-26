import React, { createContext, useState, useEffect } from "react";

export const SchoolContext = createContext();

export const SchoolProvider = ({ children }) => {
  const [classes, setClasses] = useState(() => {
    const stored = localStorage.getItem("classes");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  const addClass = (className) => {
    if (!className.trim()) return;
    const newClass = { id: Date.now().toString(), name: className, subjects: [] };
    setClasses([...classes, newClass]);
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

  const saveMarks = (classId, subjectName, studentName, classScore, examScore) => {
    setClasses((prev) =>
      prev.map((cls) => {
        if (cls.id !== classId) return cls;

        const subjectKey = `${subjectName}-marks`;
        const updatedMarks = cls[subjectKey]
          ? [...cls[subjectKey]]
          : [];

        const existing = updatedMarks.find((s) => s.name === studentName);
        if (existing) {
          existing.classScore = classScore;
          existing.examScore = examScore;
        } else {
          updatedMarks.push({ name: studentName, classScore, examScore });
        }

        return { ...cls, [subjectKey]: updatedMarks };
      })
    );
  };

  return (
    <SchoolContext.Provider value={{ classes, addClass, addSubjectToClass, saveMarks }}>
      {children}
    </SchoolContext.Provider>
  );
};
