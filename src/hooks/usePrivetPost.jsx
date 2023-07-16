import { loading } from '../provider/features/myartSlice';
import { fetchMyPost } from '../provider/features/myartSlice';
import { myart } from '../provider/features/myartSlice';
import { token } from '../provider/features/userClice';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function usePrivetpost({id}) {
    const post = useSelector(myart);
    const tk = useSelector(token)
    const ld = useSelector(loading);
    const [Loading, setLoading] = useState(() => ld);
    const [Post, setPost] = useState();
    const [End, setEnd] = useState(false);
    const [Start, setStart] = useState(false);
    const [index, setIndex] = useState(() => getIndex());
    const dispatch = useDispatch();
    const router = useRouter()
    function getIndex() {
      if (post.lenght === 0) {
        return null;
      }
      return post && id ? post.findIndex((el) => el.id === id) : null;
    }
    console.log(ld);
    useEffect(() => {
      async function loader() {
        if (post.length === 0 && tk) {
          dispatch(fetchMyPost({token:tk}));
        } else {
          setIndex(() => getIndex());
        }
      }
      loader();
    }, [post,tk]);
    useEffect(() => {
      setLoading(true);
      async function loader(params) {
        if (index === null || !id) return;
        await setPost(() => post[index]);
        await router.push(`/myart?id=${Post?.id === undefined?id:Post?.id}`)
        setLoading(false);
      }
      loader();
    }, [index]);
    function increment() {
      if (index === post?.length - 1) {
        setIndex(post.length-1);
        setEnd(true);
      } else {
        setIndex(() => index + 1);
        setEnd(false);
        setStart(false);
      }
    }
    function decrement() {
      if (index === 0) {
        setIndex(0);
        setStart(true);
      } else {
        setIndex(() => index - 1);
        setStart(false);
        setEnd(false);
      }
    }
    return {
      index,
      Post,
      Loading,
      Start,
      End,
      increment,
      decrement,
    };
}

export default usePrivetpost