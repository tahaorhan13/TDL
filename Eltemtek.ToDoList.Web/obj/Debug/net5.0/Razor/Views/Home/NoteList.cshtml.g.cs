#pragma checksum "C:\Users\hp\Desktop\GitHub\TDL\Eltemtek.ToDoList.Web\Views\Home\NoteList.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "50e34892f730b324666230a15f18dd224fe55706"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_NoteList), @"mvc.1.0.view", @"/Views/Home/NoteList.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\hp\Desktop\GitHub\TDL\Eltemtek.ToDoList.Web\Views\_ViewImports.cshtml"
using Eltemtek.ToDoList.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\hp\Desktop\GitHub\TDL\Eltemtek.ToDoList.Web\Views\_ViewImports.cshtml"
using Eltemtek.ToDoList.Web.Models;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "C:\Users\hp\Desktop\GitHub\TDL\Eltemtek.ToDoList.Web\Views\Home\NoteList.cshtml"
using Eltemtek.ToDoList.Entity.Note.Note;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "C:\Users\hp\Desktop\GitHub\TDL\Eltemtek.ToDoList.Web\Views\Home\NoteList.cshtml"
using Eltemtek.ToDoList.Entity.Account.Auth;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"50e34892f730b324666230a15f18dd224fe55706", @"/Views/Home/NoteList.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7a7b3568fe53e853b85c99d26f6f740997824ce7", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_NoteList : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<rListNote>
    {
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "C:\Users\hp\Desktop\GitHub\TDL\Eltemtek.ToDoList.Web\Views\Home\NoteList.cshtml"
   Layout = "~/Views/Shared/_Layout.cshtml"; 

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n");
            WriteLiteral("<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "50e34892f730b324666230a15f18dd224fe557063902", async() => {
                WriteLiteral("\r\n    <title>ToDoList.NoteList</title>\r\n\r\n");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "50e34892f730b324666230a15f18dd224fe557064912", async() => {
                WriteLiteral(@"
    <div class=""content"">
        <div class=""container-fluid"">
            <div class=""row"">
                <div class=""col-md-12"">
                    <div class=""card"">
                        <div class=""card-header card-header-primary"">
                            <h4 class=""card-title "">Simple Table</h4>
                            <p class=""card-category""> Here is a subtitle for this table</p>
                        </div>

                        <div class=""card-body"">
                            <div class=""table-responsive"">

                                <table id=""tblNotlar"" name=""tblNotlar"" class=""table table-hover"">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>TİTLE</th>
                                            <th>NOTE</th>
                                        </tr>
                                    </thead>
");
                WriteLiteral("                                </table>\r\n\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <script");
                BeginWriteAttribute("src", " src=\"", 2349, "\"", 2436, 1);
#nullable restore
#line 56 "C:\Users\hp\Desktop\GitHub\TDL\Eltemtek.ToDoList.Web\Views\Home\NoteList.cshtml"
WriteAttributeValue("", 2355, Url.VersionedContent("~/bundles/js/adminPro/dist/js/libs/jquery/dist/jquery.js"), 2355, 81, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral("></script>\r\n");
                WriteLiteral("    <script");
                BeginWriteAttribute("src", " src=\"", 2586, "\"", 2686, 1);
#nullable restore
#line 58 "C:\Users\hp\Desktop\GitHub\TDL\Eltemtek.ToDoList.Web\Views\Home\NoteList.cshtml"
WriteAttributeValue("", 2592, Url.VersionedContent("~/bundles/js/adminPro/dist/js/libs/bootstrap/dist/js/bootstrap.min.js"), 2592, 94, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral("></script>\r\n    <script");
                BeginWriteAttribute("src", " src=\"", 2710, "\"", 2764, 1);
#nullable restore
#line 59 "C:\Users\hp\Desktop\GitHub\TDL\Eltemtek.ToDoList.Web\Views\Home\NoteList.cshtml"
WriteAttributeValue("", 2716, Url.VersionedContent("~/bundles/js/app/app.js"), 2716, 48, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral("></script>\r\n    <script");
                BeginWriteAttribute("src", " src=\"", 2788, "\"", 2846, 1);
#nullable restore
#line 60 "C:\Users\hp\Desktop\GitHub\TDL\Eltemtek.ToDoList.Web\Views\Home\NoteList.cshtml"
WriteAttributeValue("", 2794, Url.VersionedContent("~/bundles/js/app/app.api.js"), 2794, 52, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral("></script>\r\n    <script");
                BeginWriteAttribute("src", " src=\"", 2870, "\"", 2936, 1);
#nullable restore
#line 61 "C:\Users\hp\Desktop\GitHub\TDL\Eltemtek.ToDoList.Web\Views\Home\NoteList.cshtml"
WriteAttributeValue("", 2876, Url.VersionedContent("~/bundles/js/app/app.api.account.js"), 2876, 60, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral("></script>\r\n    <script");
                BeginWriteAttribute("src", " src=\"", 2960, "\"", 3027, 1);
#nullable restore
#line 62 "C:\Users\hp\Desktop\GitHub\TDL\Eltemtek.ToDoList.Web\Views\Home\NoteList.cshtml"
WriteAttributeValue("", 2966, Url.VersionedContent("~/bundles/js/app/vw/account/login.js"), 2966, 61, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral("></script>\r\n    <script");
                BeginWriteAttribute("src", " src=\"", 3051, "\"", 3121, 1);
#nullable restore
#line 63 "C:\Users\hp\Desktop\GitHub\TDL\Eltemtek.ToDoList.Web\Views\Home\NoteList.cshtml"
WriteAttributeValue("", 3057, Url.VersionedContent("~/bundles/js/app/vw/account/notelist.js"), 3057, 64, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral("></script>\r\n");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n</html>\r\n\r\n\r\n\r\n");
            WriteLiteral("\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<rListNote> Html { get; private set; }
    }
}
#pragma warning restore 1591
