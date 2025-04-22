export const createStudent = (studentData) => ({
  url: '/students',
  config: {
    method: 'post',
    data: studentData,
  },
});

export const getStudents = (params) => ({
  url: '/students',
  config: {
    method: 'get',
    params, 
  },
});