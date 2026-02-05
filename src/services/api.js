// API Service for Attendance Module
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class AttendanceAPI {
    // Get all attendance records
    async getAll(params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${API_BASE_URL}/attendance?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching attendance records:', error);
            throw error;
        }
    }

    // Get attendance by ID
    async getById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/attendance/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching attendance record:', error);
            throw error;
        }
    }

    // Get attendance by student ID
    async getByStudentId(studentId, params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${API_BASE_URL}/attendance/student/${studentId}?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching student attendance:', error);
            throw error;
        }
    }

    // Get attendance by date
    async getByDate(date) {
        try {
            const response = await fetch(`${API_BASE_URL}/attendance/date/${date}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching attendance by date:', error);
            throw error;
        }
    }

    // Get attendance by date range
    async getByDateRange(startDate, endDate) {
        try {
            const response = await fetch(`${API_BASE_URL}/attendance/range?start=${startDate}&end=${endDate}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching attendance range:', error);
            throw error;
        }
    }

    // Create new attendance record
    async create(data) {
        try {
            const response = await fetch(`${API_BASE_URL}/attendance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating attendance record:', error);
            throw error;
        }
    }

    // Update attendance record
    async update(id, data) {
        try {
            const response = await fetch(`${API_BASE_URL}/attendance/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating attendance record:', error);
            throw error;
        }
    }

    // Delete attendance record
    async delete(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/attendance/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting attendance record:', error);
            throw error;
        }
    }

    // Bulk mark attendance
    async bulkMark(records) {
        try {
            const response = await fetch(`${API_BASE_URL}/attendance/bulk`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ records }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error bulk marking attendance:', error);
            throw error;
        }
    }

    // Get attendance statistics
    async getStatistics(params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${API_BASE_URL}/attendance/statistics?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching attendance statistics:', error);
            throw error;
        }
    }

    // Get department statistics
    async getDepartmentStatistics(department) {
        try {
            const response = await fetch(`${API_BASE_URL}/attendance/statistics/department/${department}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching department statistics:', error);
            throw error;
        }
    }

    // Export attendance data
    async export(params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${API_BASE_URL}/attendance/export?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            return blob;
        } catch (error) {
            console.error('Error exporting attendance data:', error);
            throw error;
        }
    }
}

// API Service for Results Module
class ResultsAPI {
    // Get all results
    async getAll(params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${API_BASE_URL}/results?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching results:', error);
            throw error;
        }
    }

    // Get result by ID
    async getById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/results/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching result:', error);
            throw error;
        }
    }

    // Get results by student ID
    async getByStudentId(studentId, params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${API_BASE_URL}/results/student/${studentId}?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching student results:', error);
            throw error;
        }
    }

    // Get results by semester
    async getBySemester(semester) {
        try {
            const response = await fetch(`${API_BASE_URL}/results/semester/${semester}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching semester results:', error);
            throw error;
        }
    }

    // Create new result
    async create(data) {
        try {
            const response = await fetch(`${API_BASE_URL}/results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating result:', error);
            throw error;
        }
    }

    // Update result
    async update(id, data) {
        try {
            const response = await fetch(`${API_BASE_URL}/results/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating result:', error);
            throw error;
        }
    }

    // Delete result
    async delete(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/results/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting result:', error);
            throw error;
        }
    }

    // Bulk publish results
    async bulkPublish(results) {
        try {
            const response = await fetch(`${API_BASE_URL}/results/bulk`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ results }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error bulk publishing results:', error);
            throw error;
        }
    }

    // Calculate GPA
    async calculateGPA(studentId) {
        try {
            const response = await fetch(`${API_BASE_URL}/results/student/${studentId}/gpa`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error calculating GPA:', error);
            throw error;
        }
    }

    // Calculate CGPA
    async calculateCGPA(studentId) {
        try {
            const response = await fetch(`${API_BASE_URL}/results/student/${studentId}/cgpa`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error calculating CGPA:', error);
            throw error;
        }
    }

    // Get statistics
    async getStatistics(params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${API_BASE_URL}/results/statistics?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching results statistics:', error);
            throw error;
        }
    }

    // Get department statistics
    async getDepartmentStatistics(department) {
        try {
            const response = await fetch(`${API_BASE_URL}/results/statistics/department/${department}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching department statistics:', error);
            throw error;
        }
    }

    // Export results
    async export(params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${API_BASE_URL}/results/export?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            return blob;
        } catch (error) {
            console.error('Error exporting results:', error);
            throw error;
        }
    }
}

// Export singleton instances
export const attendanceAPI = new AttendanceAPI();
export const resultsAPI = new ResultsAPI();
