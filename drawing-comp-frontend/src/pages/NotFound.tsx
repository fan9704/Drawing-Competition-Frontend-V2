import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="fixed inset-0 bg-zinc-900 flex items-center justify-center text-white text-center">
            <div>
                <h1 className="text-9xl font-bold">404</h1>
                <p className="text-2xl mt-4 ">
                    走失了嗎？
                    <Link className="text-zinc-100 underline" to="/">
                        點擊這裡
                    </Link>
                    回到首頁
                </p>
            </div>
        </div>
    );
}

export default NotFound;
