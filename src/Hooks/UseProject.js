import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL = " http://localhost:3000";
export const useProjects = () => {
    const getProjects = () => {
        return axios.get(`${BASE_URL}/projects`).then((res) => {
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
        return axios.get(`${BASE_URL}/projects/${projectId}/tasks`).then((res) => {
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
                .post(`${BASE_URL}/projects/${projectId}/tasks`, task)
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
                `${BASE_URL}/projects/${projectId}/tasks/${taskId}`
            );
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(["tasks", variables.projectId]);
        },
    });
};

export const useUpdateTask = (temp) => {
    const queryClient = useQueryClient();
    console.log(temp)

    return useMutation({
        mutationFn: ({ projectId, taskId, updatedTask }) => {
            return axios
                .put(
                    `${BASE_URL}/projects/${projectId}/tasks/${taskId}`,
                    updatedTask
                )
                .then((res) => res.data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(["tasks", variables.projectId]);
        },
    });
};