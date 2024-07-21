import { masterProtectedProcedure } from "../../procedures/authProcedure";
import { router } from "../../trpc/trpc";

export const passwordRouter = router({
  getAllPasswords: masterProtectedProcedure.query(async () => {
    return {
      status: 200,
      success: true,
      message: "Get all password successfully",
      data: [
        {
          id: 1,
          name: "password",
          email: "X1wXv@example.com",
          password: "password",
          created_at: "2022-01-01 00:00:00",
          updated_at: "2022-01-01 00:00:00",
          deleted_at: null,
          master_password: "password",
          is_deleted: false,
          is_visible: true,
          is_pinned: true,
          is_link_expired: false,
          link: "https://keyguard.link/password",
          link_expiry: "2022-01-01 00:00:00",
        },
      ],
    };
  }),
});
