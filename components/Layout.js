import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'

const NavBar = dynamic(() => import('./NavBar'));

export default function Layout(props){
    const router = useRouter();

    return(
        <div className="container">
            <Head>
                <title>VideoGameBounties.com</title>
                <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />

                <link rel="stylesheet" href="/css/bootstrap.min.css"></link>
                <link rel="stylesheet" href="/css/main.css"></link>

                {/* <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link> */}

                <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossOrigin="anonymous"></script>
                {/* <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script> */}
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossOrigin="anonymous"></script>
            </Head>
            <NavBar page={router.pathname} />
            {props.children}
        </div>
    );
}