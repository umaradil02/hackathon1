import toast from "react-hot-toast";

// API Routes
const loginRoute = "https://hacakathon-bakend-5edb5ujt2-umaradil02s-projects.vercel.app/auth/login";
const signupRoute = "https://hacakathon-bakend-5edb5ujt2-umaradil02s-projects.vercel.app/auth/signup";
const registerRoute = "http://localhost:5000/auth/register";

/**
 * Sign in with email and password
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} - The response data from the API.
 * @throws {Error} - If the API call fails or returns an error.
 */
const signInWithEmailAndPassword = async (email, password) => {
    try {
        const response = await fetch(loginRoute, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to log in. Please try again.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error during sign-in:", error.message);
        throw error;
    }
};

/**
 * Register a new user with email and password
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} - The response data from the API.
 * @throws {Error} - If the API call fails or returns an error.
 */
const RegisterWithEmailAndPassword = async (email, password) => {
    try {
        const response = await fetch(signupRoute, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to register. Please try again.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error during registration:", error.message);
        throw error;
    }
};
const RegisterWithDetails = async (cnic, name, email) => {
    try {
        const loader=toast.loading("Registering")
        const response = await fetch(registerRoute, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cnic, name, email }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to register. Please try again.");
        }

        const resp= await response.json();
        
        toast.success(resp,loader)
    } catch (error) {
        console.error("Error during registration:", error.message);
        throw error;
    }
};

export  { signInWithEmailAndPassword, RegisterWithEmailAndPassword, RegisterWithDetails };