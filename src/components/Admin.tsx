import axios from "axios";
import { useEffect, useState } from "react";

const CATEGORIES = ["dog", "cat", "bird", "other"];

export default function Admin() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [editingPet, setEditingPet] = useState<Pet | null>(null);

    useEffect(() => {
        fetchPets();
    }, []);

    async function fetchPets() {
        try {
            const requests = CATEGORIES.map(cat => 
                axios.get(`${import.meta.env.VITE_API_ENDPOINT}/${cat}`)
                     .then(res => res.data.map((p: any) => ({ ...p, category: cat })))
            );
            const results = await Promise.all(requests);
            setPets(results.flat());
        } catch (error) {
            console.error("Failed to fetch pets", error);
        }
    }

    async function handleDelete(id: string, category: string) {
        if (!window.confirm("Are you sure you want to delete this pet?")) return;
        
        try {
             await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/${category}/${id}`);
             fetchPets();
        } catch (error) {
            console.error("Failed to delete pet", error);
            alert("Failed to delete pet");
        }
    }

    function handleEdit(pet: Pet) {
        setEditingPet(pet);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const body: Record<string, any> = {};

        formData.forEach((value, key) => {
            if (key === "category" && typeof value === "string") {
                body[key] = value.toLowerCase();
            } else {
                body[key] = value;
            }
        });

        try {
            if (editingPet) {
                const category = editingPet.category || body.category;
                await axios.put(
                    `${import.meta.env.VITE_API_ENDPOINT}/${category}/${editingPet.id}`,
                    body
                );
                setEditingPet(null);
            } else {
                await axios.post(
                    `${import.meta.env.VITE_API_ENDPOINT}/${body.category}`,
                    body
                );
            }
            (e.target as HTMLFormElement).reset();
            fetchPets();
            alert(editingPet ? "Pet updated successfully!" : "Pet added successfully!");
        } catch (error) {
            console.error("Failed to save pet", error);
            alert("Failed to save pet");
        }
    }

    return (
        <div className="admin-section">
            <div className="admin-card">
                <h1>{editingPet ? "Edit Pet" : "Add New Pet"}</h1>
                
                {editingPet && (
                    <button 
                        type="button" 
                        className="cancel-edit-btn"
                        onClick={() => {
                            setEditingPet(null);
                            (document.getElementById('pet-form') as HTMLFormElement)?.reset();
                        }}
                    >
                        Cancel Edit
                    </button>
                )}

                <form id="pet-form" onSubmit={handleSubmit} key={editingPet ? editingPet.id : 'new'}>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" defaultValue={editingPet?.category || "dog"} disabled={!!editingPet} required>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="bird">Bird</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Breed</label>
                        <input name="breed" defaultValue={editingPet?.breed} placeholder="e.g. Golden Retriever" required />
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <select name="gender" defaultValue={editingPet?.gender} required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input name="location" defaultValue={editingPet?.location} placeholder="e.g. New York, NY" required />
                    </div>

                    <div className="form-group">
                        <label>Short Description</label>
                        <input name="short_description" defaultValue={editingPet?.short_description} placeholder="Brief summary" required />
                    </div>

                    <div className="form-group">
                        <label>Long Description</label>
                        <textarea name="long_description" defaultValue={editingPet?.long_description} placeholder="Detailed description about the pet..." required />
                    </div>

                    <div className="form-group">
                        <label>Image URL</label>
                        <input name="image" defaultValue={editingPet?.image} placeholder="https://example.com/image.jpg" required />
                    </div>

                    <button type="submit">{editingPet ? "Update Pet" : "Add Pet"}</button>
                </form>
            </div>

            <div className="admin-list">
                <h2 className="admin-list-title">Manage Pets</h2>
                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr className="table-header-row">
                                <th>Image</th>
                                <th>Name/Breed</th>
                                <th>Category</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets.map((pet) => (
                                <tr key={`${pet.category}-${pet.id}`} className="table-row">
                                    <td>
                                        <img 
                                            src={pet.image} 
                                            alt={pet.breed} 
                                            className="pet-image"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://placehold.co/40x40?text=?';
                                            }} 
                                        />
                                    </td>
                                    <td className="pet-breed">{pet.breed}</td>
                                    <td className="pet-category">{pet.category}</td>
                                    <td className="pet-location">{pet.location}</td>
                                    <td>
                                        <div className="actions">
                                            <button 
                                                className="edit-btn"
                                                onClick={() => handleEdit(pet)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="delete-btn"
                                                onClick={() => handleDelete(pet.id, pet.category!)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {pets.length === 0 && (
                                <tr className="empty-row">
                                    <td colSpan={5}>
                                        No pets found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
