import {
    ChallengeType,
    ChallengeSubmissionType,
    LeaderboardStatusType,
    RoundType,
} from "../types/challenges";
import { LeaderBoardRow } from "../types/teamview";

export const FakeRoundData: RoundType = {
    id: "2",
    start_time: new Date(),
    end_time: new Date(new Date().getTime() + 30 * 60000),
    challenges: [
        {
            id: "1",
            title: "題目1",
            description: "題目1描述",
            image_url:
                "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
            difficulty: "easy",
        },
        {
            id: "2",
            title: "題目2",
            description: "題目2描述",
            image_url:
                "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
            difficulty: "medium",
        },
        {
            id: "3",
            title: "題目3",
            description: "題目3描述",
            image_url:
                "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
            difficulty: "hard",
        },
    ],
};

export const R1ChallengeCards: ChallengeType[] = [
    {
        id: "1",
        title: "圓形",
        description: "畫一個圓形",
        difficulty: "easy",
        image_url:
            "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
    },
    {
        id: "2",
        title: "圓形",
        description: "畫一個圓形",
        difficulty: "easy",
        image_url:
            "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
    },
    {
        id: "3",
        title: "圓形",
        description: "畫一個圓形",
        difficulty: "medium",
        image_url:
            "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
    },
    {
        id: "4",
        title: "圓形",
        description: "畫一個圓形",
        difficulty: "medium",
        image_url:
            "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
    },
    {
        id: "5",
        title: "圓形",
        description: "畫一個圓形",
        difficulty: "hard",
        image_url:
            "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
    },
    {
        id: "6",
        title: "圓形",
        description: "畫一個圓形",
        difficulty: "hard",
        image_url:
            "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
    },
];

export const SampleChallenge: ChallengeType = {
    id: "1",
    title: "圓形",
    description:
        "Velit occaecat consectetur adipisicing qui dolore amet nostrud deserunt deserunt. Commodo pariatur excepteur commodo esse fugiat cillum sit mollit et laborum Lorem sit mollit. Cillum sit laboris id fugiat esse. Dolor reprehenderit non aliqua proident Lorem laborum aliquip do aliqua cillum.",
    difficulty: "easy",
    image_url:
        "https://external-preview.redd.it/CRpvb5lVKagBOq40Fyyt9JxjG8PfTPDMKkX_EaVn3tc.jpg?auto=webp&s=f6a3a343c6b0512e0efe6f2bbafb6c28a960afe1",
};

export const LeaderboardStatus: LeaderboardStatusType[] = [
    {
        team: "1",
        team_name: "第一隊",
        fitness: 100,
        execute_time: 100,
        max_score: 100,
    },
    {
        team: "2",
        team_name: "第二隊",
        fitness: 90,
        execute_time: 100,
        max_score: 90,
    },
    {
        team: "3",
        team_name: "第三隊",
        fitness: 80,
        execute_time: 100,
        max_score: 80,
    },
];

export const SubmissionData: ChallengeSubmissionType[] = [
    {
        id: "2",
        score: 100,
        word_count: 10,
        fitness: 100,
        status: "todo",
        time: new Date(),
        code: "print('hello world')",
        execute_time: 0,
        stdout: ``,
        stderr: "",
    },
    {
        id: "1",
        score: 100,
        word_count: 10,
        fitness: 100,
        status: "success",
        time: new Date(),
        code: "print('hello world')",
        execute_time: 1000,
        stdout: `
        [19/May/2024 19:09:03] "GET /static/admin/img/icon-addlink.svg HTTP/1.1" 200 331
        [19/May/2024 19:09:07] "GET /admin/api/submission/add/ HTTP/1.1" 200 21550
        [19/May/2024 19:09:07] "GET /static/admin/js/calendar.js HTTP/1.1" 200 8466
        [19/May/2024 19:09:07] "GET /static/admin/js/admin/DateTimeShortcuts.js HTTP/1.1" 200 19319
        [19/May/2024 19:09:07] "GET /static/admin/css/forms.css HTTP/1.1" 200 9090
        [19/May/2024 19:09:07] "GET /admin/jsi18n/ HTTP/1.1" 200 7735
        [19/May/2024 19:09:07] "GET /static/admin/img/icon-viewlink.svg HTTP/1.1" 200 581
        [19/May/2024 19:09:07] "GET /static/admin/img/icon-changelink.svg HTTP/1.1" 200 380
        [19/May/2024 19:09:07] "GET /static/admin/css/widgets.css HTTP/1.1" 200 11921
        [19/May/2024 19:09:07] "GET /static/admin/js/prepopulate_init.js HTTP/1.1" 200 586
        [19/May/2024 19:09:07] "GET /static/admin/js/change_form.js HTTP/1.1" 200 606
        [19/May/2024 19:09:07] "GET /static/admin/img/icon-calendar.svg HTTP/1.1" 200 1086
        [19/May/2024 19:09:07] "GET /static/admin/img/icon-clock.svg HTTP/1.1" 200 677`,
        stderr: `Internal Server Error: /admin/api/submission/
        Traceback (most recent call last):
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/core/handlers/exception.py", line 55, in inner
            response = get_response(request)
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/core/handlers/base.py", line 197, in _get_response
            response = wrapped_callback(request, *callback_args, **callback_kwargs)
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/contrib/admin/options.py", line 688, in wrapper
            return self.admin_site.admin_view(view)(*args, **kwargs)
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/utils/decorators.py", line 134, in _wrapper_view
            response = view_func(request, *args, **kwargs)
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/views/decorators/cache.py", line 62, in _wrapper_view_func
            response = view_func(request, *args, **kwargs)
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/contrib/admin/sites.py", line 242, in inner
            return view(request, *args, **kwargs)
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/utils/decorators.py", line 46, in _wrapper
            return bound_method(*args, **kwargs)
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/utils/decorators.py", line 134, in _wrapper_view
            response = view_func(request, *args, **kwargs)
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/contrib/admin/options.py", line 1926, in changelist_view
            cl = self.get_changelist_instance(request)
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/contrib/admin/options.py", line 836, in get_changelist_instance
            return ChangeList(
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/contrib/admin/views/main.py", line 122, in __init__
            self.queryset = self.get_queryset(request)
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/contrib/admin/views/main.py", line 503, in get_queryset
            ) = self.get_filters(request)
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/contrib/admin/views/main.py", line 182, in get_filters
            spec = field_list_filter_class(
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/contrib/admin/filters.py", line 175, in create
            return list_filter_class(
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/contrib/admin/filters.py", line 188, in __init__
            self.lookup_choices = self.field_choices(field, request, model_admin)
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/contrib/admin/filters.py", line 225, in field_choices
            return field.get_choices(include_blank=False, ordering=ordering)
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/db/models/fields/__init__.py", line 1009, in get_choices
            return (blank_choice if include_blank else []) + [
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/db/models/query.py", line 398, in __iter__
            self._fetch_all()
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/db/models/query.py", line 1881, in _fetch_all
            self._result_cache = list(self._iterable_class(self))
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/db/models/query.py", line 121, in __iter__
            for row in compiler.results_iter(results):
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/db/models/sql/compiler.py", line 1500, in apply_converters
            value = converter(value, expression, connection)
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/db/backends/sqlite3/operations.py", line 328, in convert_timefield_value
            value = parse_time(value)
          File "/Users/andrew/Github/Drawing-Competition-Backend/.venv/lib/python3.10/site-packages/django/utils/dateparse.py", line 95, in parse_time
            return datetime.time.fromisoformat(value).replace(tzinfo=None)
        TypeError: fromisoformat: argument must be str`,
    },
];

export const LeaderboardData: LeaderBoardRow[] = [
    {
        teamName: "第一隊",
        challengeStats: [10, 10, 10, 10, 10],
    },
    {
        teamName: "第二隊",
        challengeStats: [1, 2, 3, 4, 60],
    },
    {
        teamName: "第三隊",
        challengeStats: [5, 10, 16, 20, 100],
    },
];
