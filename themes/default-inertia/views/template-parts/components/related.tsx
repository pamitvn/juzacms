import {__} from "@/helpers/functions";
import {Link} from "@inertiajs/react";
import {Post} from "@/types/posts";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Related({ post }: {post: Post}) {
    const {items, setItems} = useState<Post[]>([]);

    useEffect(() => {
        axios.get('/ajax/related-posts?post_slug='+ post.slug).then(({data}) => {
            setItems(data);
        });
    }, [post.slug])

    return (
        <div className="related-article">
            <h4>
                {__('you may also like')}
            </h4>

            <div className="article__entry-carousel-three">
                {items && items.map((item) => (
                    <div className="item">
                        <div className="article__entry">
                            <div className="article__image">
                                <Link href={item.url}>
                                    <img src={item.thumbnail} alt={item.title} className="img-fluid"/>
                                </Link>
                            </div>

                            <div className="article__content">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                        <span className="text-primary">
                                            {__('by')} {item.author?.name}
                                        </span>
                                    </li>

                                    <li className="list-inline-item">
                                        <span className="text-dark text-capitalize">
                                            {item.created_at}
                                        </span>
                                    </li>
                                </ul>
                                <h5>
                                    <Link href={item.url}>
                                        {item.title}
                                    </Link>
                                </h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}