import axios from "axios";

export default function Admin() {

    async function handleClick(data: FormData) {
        const body: Record<string, any> = {}

        data.forEach((value, key) => {
            // if category, lowercase it to match json-server resource
            if (key === "category" && typeof value === "string") {
                body[key] = value.toLowerCase()
            } else {
                body[key] = value
            }
        })

        return axios.post(
            `${import.meta.env.VITE_API_ENDPOINT}/${body.category}`,
            body
        )
    }

    return (
        <div className="admin-section">
            <div className="admin-card">
                <h1>Add New Pet</h1>
                <form id="pet-form" onSubmit={e => {
                    e.preventDefault();
                    const data = new FormData(e.currentTarget);
                    handleClick(data);
                }}>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" required>
                            <option>Dog</option>
                            <option>Cat</option>
                            <option>Bird</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Breed</label>
                        <input name="breed" placeholder="e.g. Golden Retriever" required />
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <select name="gender" required>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input name="location" placeholder="e.g. New York, NY" required />
                    </div>

                    <div className="form-group">
                        <label>Short Description</label>
                        <input name="short_description" placeholder="Brief summary" required />
                    </div>

                    <div className="form-group">
                        <label>Long Description</label>
                        <textarea name="long_description" placeholder="Detailed description about the pet..." required />
                    </div>

                    <div className="form-group">
                        <label>Image URL</label>
                        <input name="image" placeholder="https://example.com/image.jpg" required />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
