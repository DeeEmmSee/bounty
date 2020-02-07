import Link from 'next/link';

export default function AccessDenied() {
    return (
        <div className="col-sm-12">
            <Link href="/login"><a>Please click here to log in</a></Link>
        </div>
    );
}