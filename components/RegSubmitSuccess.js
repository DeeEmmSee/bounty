import Link from 'next/link';

export default function RegSubmitSuccess() {
    return (
        <div className="col-sm-12">
            Success! <Link href="/login"><a>Please click here to log in</a></Link>
        </div>
    );
}