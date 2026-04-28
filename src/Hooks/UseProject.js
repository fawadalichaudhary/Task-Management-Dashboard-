import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_API_BASE_URL
console.log({ BASE_URL });

export const useProjects = () => {
    const getProjects = () => {
        return axios.get(`${BASE_URL}/projects`, {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        }).then((res) => {
            console.log("projects", res.data);
            return res.data;
        });
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["projects"],
        queryFn: getProjects,
        refetchOnWindowFocus: false,
    });

    return { projects: data, isLoading, isError, error };
};

export const useProjectTasks = (projectId) => {
    const getTasks = () => {
        return axios.get(`${BASE_URL}/projects/${projectId}/tasks`, {
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        }).then((res) => {
            console.log("tasks", res.data);
            return res.data;
        });
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["tasks", projectId],
        queryFn: getTasks,
        enabled: !!projectId,
    });

    return { tasks: data, isLoading, isError, error };
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ projectId, task }) => {
            return axios
                .post(`${BASE_URL}/projects/${projectId}/tasks`, task, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                })
                .then((res) => res.data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(["tasks", variables.projectId]);
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ projectId, taskId }) => {
            return axios.delete(
                `${BASE_URL}/projects/${projectId}/tasks/${taskId}`, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            }
            );
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(["tasks", variables.projectId]);
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ projectId, taskId, updatedTask }) => {
            return axios
                .put(
                    `${BASE_URL}/projects/${projectId}/tasks/${taskId}`,
                    updatedTask, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                }
                )
                .then((res) => res.data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["tasks", variables.projectId],
            });
        },
    });
};
export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ projectId, updatedProject }) => {
            return axios.put(
                `${BASE_URL}/projects/${projectId}`,
                updatedProject, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["projects"]);
        },
    });
};


export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (projectId) => {
            return axios.delete(`${BASE_URL}/projects/${projectId}`, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["projects"]);
        },
    });
};
export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (project) => {
            return axios
                .post(`${BASE_URL}/projects`, project, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                })
                .then((res) => res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["projects"]);
        },
    });
};