const hrTeam = { id: 1, dname: '인사팀' };
const devTeam = { id: 2, dname: '개발팀' };
const depts = [hrTeam, devTeam];
const hong = { id: 1, name: 'Hong', dept: 1 };
const kim = { id: 2, name: 'Kim', dept: 2 };
const emps = [
  hong,
  kim,
  { id: 3, name: 'Park', dept: 2 },
  { id: 4, name: 'Choi', dept: 2 },
];
// console.log([...depts.entries()]);
const deptMap = new Map();
for (const d of depts.values()) {
  // console.log('🚀  d:', d);
  deptMap.set(d.id, d);
}
console.log('🚀  deptMap:', deptMap);

// [ [k, v], [k, v], ``[emp.id, emp]``  ]
// console.log('🚀  empEntries:', empEntries);
// const empEntries = emps.map(emp => [emp.id, emp]);
// const empMap = new Map(empEntries);

const empMap = new Map(emps.map(emp => [emp.id, emp]));
console.log('🚀  empMap:', empMap);

// console.log([...empMap]);

const empDept = new Map(
  [...empMap].map(([, emp]) => [emp, deptMap.get(emp.dept)])
);
// console.log('🚀  empDept:', empDept);

const empDept2 = new Map();
for (const [, emp] of empMap) {
  // empDept2.set(emp, deptMap.get(emp.dept));
  empDept2.set(
    emp,
    depts.find(d => d.id == emp.dept)
    // depts.findBy('id', emp.dept)
  );
}
console.log('🚀  empDept2:', empDept2);

console.log('Result>>', empDept.get(kim).dname);
