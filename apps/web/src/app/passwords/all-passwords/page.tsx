import DefaultLayout from "@keyguard/web/components/DefaultLayout";
import AllPasswordComp from "@keyguard/web/components/passwords/AllPasswords";

export default function AllPasswords() {
  return (
    <DefaultLayout>
        <AllPasswordComp />
    </DefaultLayout>
  );
}

// password page list data for table
// search and filter - (filter with strength and category)

// 1. name
// 2. username
// 3. category
// 4. Strength
// 5. Actions
  // 1. edit
  // 2. delete
  // 3. redirect link