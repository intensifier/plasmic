import { Avatar } from "@/wab/client/components/studio/Avatar";
import UserListItem from "@/wab/client/components/user-mentions/UserListItem";
import {
  DefaultUserMentionsPopoverContentProps,
  PlasmicUserMentionsPopoverContent,
} from "@/wab/client/plasmic/user_mentions/PlasmicUserMentionsPopoverContent";
import { ApiUser } from "@/wab/shared/ApiSchema";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import * as React from "react";

export interface UserMentionsPopoverContentProps
  extends DefaultUserMentionsPopoverContentProps {
  users: ApiUser[];
  highlightIndex: number;
}

function UserMentionsPopoverContent_(
  props: UserMentionsPopoverContentProps,
  ref: HTMLElementRefOf<"div">
) {
  const { users, highlightIndex = 0, ...plasmicProps } = props;

  return (
    <PlasmicUserMentionsPopoverContent
      root={{ ref }}
      {...plasmicProps}
      userList={{
        children: users.map((user, index) => (
          <UserListItem
            value={user.email}
            label={user.email}
            key={user.email}
            userEmail={user.email}
            username={`${user.firstName} ${user.lastName}`}
            isHighlighted={index === highlightIndex}
            avatar={<Avatar user={user} size={"small"} />}
          />
        )),
      }}
    />
  );
}

const UserMentionsPopoverContent = React.forwardRef(
  UserMentionsPopoverContent_
);
export { UserMentionsPopoverContent };
