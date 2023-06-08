import axios from "axios";

export default function getMp3File({demoId, setMp3Selected}) {
    const token = localStorage.getItem('token');
    console.log("hieronder filename")
    console.log(demoId);
    console.log(setMp3Selected);
    async function fetchFileUrl() {
        try {
            const response = await axios.get(`http://localhost:8081/demos/${demoId}/download`, {
                responseType: "blob",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            const file = new Blob([response.data], { type: response.headers["content-type"]});
            const fileUrl = URL.createObjectURL(file);
            setMp3Selected(fileUrl);
        } catch (e) {
            console.error(e);
        }
    }

    void fetchFileUrl();
}