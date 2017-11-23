using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using AspNetCoreAngularSpa;
using AspNetCoreAngularSpa.Models;
using AspNetCoreAngularSpa.ViewModels;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace AspNetCoreAngularSpa.Controllers
{
    public class UsersMvcController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IHostingEnvironment _environment;

        public UsersMvcController(ApplicationDbContext context, IHostingEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        // GET: UsersMvc
        public async Task<IActionResult> Index()
        {
            return View(await _context.Users.ToListAsync());
        }

        // GET: UsersMvc/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await _context.Users
                .SingleOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // GET: UsersMvc/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: UsersMvc/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([FromForm] UserVM vm)
    {
        if (ModelState.IsValid)
        {
            var filePath = Path.Combine(_environment.ContentRootPath, @"Uploads", vm.Avatar.FileName);
            
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await vm.Avatar.CopyToAsync(stream);
            }

            User user = new User
            {
                Name = vm.Name,
                Avatar = vm.Avatar.FileName
            };

            _context.Add(user);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        return View(vm);
    }

        // GET: UsersMvc/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await _context.Users.SingleOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            var vm = new UserVM
            {
                Name = user.Name
            };

            return View(vm);
        }

        // POST: UsersMvc/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [FromForm] UserVM vm)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var user = await _context.Users.SingleOrDefaultAsync(m => m.Id == id);

                    var filePath = Path.Combine(_environment.ContentRootPath, @"Uploads", vm.Avatar.FileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await vm.Avatar.CopyToAsync(stream);
                    }

                    user.Name = vm.Name;
                    user.Avatar = vm.Avatar.FileName;

                    _context.Update(user);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(vm);
        }

        // GET: UsersMvc/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await _context.Users
                .SingleOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // POST: UsersMvc/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var user = await _context.Users.SingleOrDefaultAsync(m => m.Id == id);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
