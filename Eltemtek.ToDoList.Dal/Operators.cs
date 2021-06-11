﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eltemtek.ToDoList.Dal.Account
{
    public class Operators
    {
        public const string Equal = "eq";
        public const string NotEqual = "neq";
        public const string IsNull = "isnull";
        public const string IsNotNull = "isnotnull";
        public const string StartsWith = "startswith";
        public const string Contains = "contains";
        public const string EndsWith = "endswith";
        public const string DoesNotContain = "doesnotcontain";
        public const string GreaterThan = "gt";
        public const string GreaterThanOrEqual = "gte";
        public const string LessThan = "lt";
        public const string LessThanOrEqual = "lte";
    }
}
