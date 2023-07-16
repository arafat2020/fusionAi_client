import { fetchPost, loading, reasult } from "../provider/features/termslice";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function usePost({ id }) {
  const post = useSelector(reasult);
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
  useEffect(() => {
    async function loader() {
      if (post.length === 0) {
        dispatch(fetchPost());
      } else {
        setIndex(() => getIndex());
      }
    }
    loader();
  }, [post]);
  useEffect(() => {
    setLoading(true);
    async function loader(params) {
      if (index === null) return;
      await setPost(() => post[index]);
      await router.push(`/gallery?id=${Post?.id === undefined?id:Post?.id}`)
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

export default usePost;
