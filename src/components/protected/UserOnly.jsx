import { status, user } from "../../provider/features/userClice";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

function UserOnly({ children }) {
  const me = useSelector(user);
  const st = useSelector(status);
  const router = useRouter();
  useMemo(() => {
    if (st === "pending") return;
    if (
      (me === null && st === "Unathenticated") ||
      (me === null && st === "ok")
    ) {
      router.push("/");
    }
  }, [me, st]);

  return <>{children}</>;
}
export default UserOnly;
